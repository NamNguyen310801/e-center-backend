const Course = require("../models/CourseModel");
const Review = require("../models/ReviewModel");
const User = require("../models/UserModel");
const createCourse = async (newCourse) => {
  const {
    name,
    price = "",
    thumbnail = "",
    discount = 0,
    studentsCount = 0,
    tracks = [],
    description = "",
    isPro = false,
    isComingSoon = false,
    isSelling = false,
    isCompletable = false,
  } = newCourse;
  try {
    // Tạo một mới lớp học từ dữ liệu được gửi lên
    const existingCourse = await Course.findOne({ name });
    if (existingCourse) {
      return {
        status: "ERROR",
        message: "Khóa học đã tồn tại",
      };
    }
    const createCourse = await Course.create({
      name,
      price,
      thumbnail,
      discount,
      tracks,
      studentsCount,
      description,
      isPro,
      isComingSoon,
      isSelling,
      isCompletable,
    });
    if (createCourse) {
      return {
        status: "OK",
        message: "Khóa học đã được tạo thành công",
        data: createCourse,
      };
    }
  } catch (error) {
    return {
      status: "ERROR",
      message: "Lỗi khi tạo khóa học",
      error: error.message,
    };
  }
};

const updateCourse = async (id, updatedData) => {
  try {
    const courseToUpdate = await Course.findByIdAndUpdate(id, updatedData, {
      new: true,
      runValidators: true,
    });

    if (!courseToUpdate) {
      return {
        status: "ERROR",
        message: "Khóa học không tồn tại",
      };
    }
    return {
      status: "OK",
      message: "Cập nhật khóa học thành công",
      data: courseToUpdate,
    };
  } catch (error) {
    throw error;
  }
};
const getAllCourse = async () => {
  try {
    const courseList = await Course.find();

    return {
      status: "OK",
      message: "SUCCESS",
      data: courseList,
    };
  } catch (error) {
    throw error;
  }
};
//get detail
const getDetailCourse = async (id) => {
  try {
    const course = await Course.findOne({ _id: id }).populate({
      path: "tracks.trackSteps",
      model: "Lesson",
    });
    if (course === null) {
      return {
        status: "ERROR",
        message: "Khóa học không tồn tại",
      };
    }
    return {
      status: "OK",
      message: "SUCCESS",
      data: course,
    };
  } catch (error) {
    return {
      status: "ERROR",
      message: "Lỗi khi lấy khóa học",
      error: error.message,
    };
  }
};
//delete
const deleteCourse = async (id) => {
  try {
    const checkCourse = await Course.findOne({ _id: id });
    if (checkCourse === null) {
      return {
        status: "ERROR",
        message: "Khóa học không tồn tại",
      };
    }
    await Course.findByIdAndDelete(id);
    return {
      status: "OK",
      message: "Xóa thành công",
    };
  } catch (error) {
    throw error;
  }
};
const addTrackToCourse = async (id, trackData) => {
  try {
    const { title, position = 0, trackSteps = [], isFree = false } = trackData;
    const checkCourse = await Course.findOne({ _id: id });
    if (checkCourse === null) {
      return {
        status: "ERROR",
        message: "Khóa học không tồn tại",
      };
    }
    const checkTrack = checkCourse?.tracks?.find(
      (track) => track?.title === title || track?.position === position
    );
    if (checkTrack) {
      return {
        status: "ERROR",
        message: "Tên chương học hoặc vị trí đã tồn tại",
      };
    }
    checkCourse?.tracks?.push({
      title: title,
      isFree: isFree,
      position: position,
      trackSteps: trackSteps,
    });
    checkCourse?.tracks?.sort((a, b) => a.position - b.position);
    await checkCourse.save();
    return {
      status: "OK",
      message: "Thêm chương học thành công",
      data: checkCourse,
    };
  } catch (error) {
    throw error;
  }
};
const updateTrack = async (courseId, trackId, trackData) => {
  try {
    const { title, position, isFree } = trackData;
    const checkCourse = await Course.findOne({ _id: courseId });
    if (checkCourse === null) {
      return {
        status: "ERROR",
        message: "Khóa học không tồn tại",
      };
    }
    const trackToUpdate = checkCourse?.tracks?.find(
      (track) => track?._id.toString() === trackId
    );
    if (!trackToUpdate) {
      return {
        status: "ERROR",
        message: "Không tìm thấy chương học!",
      };
    }
    const tracksDiff = checkCourse?.tracks?.filter(
      (track) => track?._id.toString() !== trackId
    );
    const trackTitle = tracksDiff?.find(
      (track) => track?.title?.toString() === title
    );
    const trackPosition = tracksDiff?.find(
      (track) => track?.position === position
    );
    if (trackTitle || trackPosition) {
      return {
        status: "ERROR",
        message: "Tên chương học hoặc vị trí đã tồn tại",
      };
    }
    // Cập nhật các trường của track
    trackToUpdate.title = title || trackToUpdate.title;
    trackToUpdate.isFree = isFree || trackToUpdate.isFree;
    trackToUpdate.position = position || trackToUpdate.position;
    checkCourse?.tracks?.sort((a, b) => a.position - b.position);
    await checkCourse.save();
    return {
      status: "OK",
      message: "Cập nhật chương học thành công",
    };
  } catch (error) {
    throw error;
  }
};
const deleteTrack = async (courseId, trackId, trackData) => {
  try {
    const { title, position, isFree } = trackData;
    const checkCourse = await Course.findOne({ _id: courseId });
    if (checkCourse === null) {
      return {
        status: "ERROR",
        message: "Khóa học không tồn tại",
      };
    }
    const trackToUpdate = checkCourse?.tracks?.find(
      (track) => track?._id.toString() === trackId
    );
    if (!trackToUpdate) {
      return res.status(404).send("Không tìm thấy chương học");
    }
    if (trackToUpdate) {
      const trackDel = checkCourse?.tracks?.findIndex(
        (track) => track?._id.toString() === trackId
      );
      if (trackDel !== -1) {
        checkCourse?.tracks?.splice(trackDel, 1);
      }
    }
    await checkCourse.save();
    return {
      status: "OK",
      message: "Xóa chương học thành công",
    };
  } catch (error) {
    throw error;
  }
};
const addLessonToCourse = async (id, trackId, lessonData) => {
  try {
    const course = await Course.findOne({ _id: id });
    if (course === null) {
      return {
        status: "ERROR",
        message: "Khóa học không tồn tại",
      };
    }
    const track = course?.tracks?.find(
      (track) => track?._id?.toString() === trackId
    );

    if (!track) {
      return res.status(404).send("Không tìm thấy chương học");
    }
    const lessonsInTrack = lessonData?.trackSteps?.some((lessonId) =>
      track?.trackSteps?.includes(lessonId?.toString())
    );
    if (lessonsInTrack) {
      return {
        status: "ERROR",
        message: "Bài học đã tồn tại trong chương học",
      };
    } else {
      lessonData?.trackSteps?.map((lessonId) =>
        track?.trackSteps?.push(lessonId)
      );
      await course.save();
      return {
        status: "OK",
        message: "Thêm bài học vào khóa học thành công",
      };
    }
  } catch (error) {
    throw error;
  }
};
const deleteLessonInCourse = async (courseId, trackId, lessonId) => {
  try {
    const checkCourse = await Course.findOne({ _id: courseId });
    if (checkCourse === null) {
      return {
        status: "ERROR",
        message: "Khóa học không tồn tại",
      };
    }
    const trackToUpdate = checkCourse?.tracks?.find(
      (track) => track?._id.toString() === trackId
    );
    if (!trackToUpdate) {
      return res.status(404).send("Không tìm thấy chương học");
    }
    if (trackToUpdate) {
      const lessonDel = trackToUpdate?.trackSteps?.findIndex(
        (lesson) => lesson?.toString() === lessonId
      );
      if (lessonDel !== -1) {
        trackToUpdate?.trackSteps?.splice(lessonDel, 1);
      }
    }
    await checkCourse.save();
    return {
      status: "OK",
      message: "Xóa bài học khỏi chương học thành công",
    };
  } catch (error) {
    throw error;
  }
};
const createRating = async (data) => {
  try {
    const { courseId, userId, rating, description = "" } = data;

    const checkCourse = await Course.findOne({
      _id: courseId,
    });
    if (!checkCourse) {
      return {
        status: "Error",
        message: "Khóa học không tồn tại",
      };
    }
    const checkUser = await User.findOne({
      _id: userId,
    });
    if (!checkUser) {
      return {
        status: "Error",
        message: "Người dùng không tồn tại",
      };
    }
    const checkReview = await Review.findOne({
      courseId: courseId,
      userId: userId,
    });
    if (checkReview) {
      return {
        status: "Error",
        message: "Bạn đã đánh giá khóa học này rồi",
      };
    }
    const newReview = await Review.create({
      courseId: courseId,
      userId: userId,
      rating: rating,
      description: description || "",
    });
    if (!newReview) {
      return {
        status: "Error",
        message: "Lỗi xảy ra khi tạo đánh giá",
      };
    }
    return {
      status: "OK",
      message: "Đánh giá khóa học thành công",
      data: newReview,
    };
  } catch (error) {
    return {
      status: "Error",
      message: "Lỗi xảy ra khi tạo đánh giá",
      error: error.message,
    };
  }
};
const updateCourseRating = async (courseId) => {
  try {
    const reviews = await Review.find({ courseId }).select("rating");
    if (reviews.length > 0) {
      const totalRating = reviews.reduce(
        (sum, review) => sum + review.rating,
        0
      );
      const averageRating = totalRating / reviews.length;
      const course = await Course.findById(courseId);
      if (course) {
        course.rating = averageRating;
        await course.save();
        return {
          status: "OK",
          message: "Đánh giá khóa học thành công",
          data: course,
        };
      }
      return {
        status: "Error",
        message: "Khóa học không tồn tại",
      };
    }
  } catch (error) {
    return {
      status: "Error",
      message: "Lỗi khi cập nhật rating của khóa học",
      error: error.message,
    };
  }
};
module.exports = {
  createCourse,
  updateCourse,
  getAllCourse,
  deleteCourse,
  addTrackToCourse,
  addLessonToCourse,
  updateTrack,
  deleteTrack,
  deleteLessonInCourse,
  getDetailCourse,
  createRating,
  updateCourseRating,
};
