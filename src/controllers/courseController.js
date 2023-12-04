const courseService = require("../services/courseService");
//create
const createCourse = async (req, res) => {
  try {
    const { name } = req.body;
    if (!name) {
      return res.status(200).json({
        status: "ERROR",
        message: "Vui lòng nhập đầy đủ thông tin",
      });
    }
    const response = await courseService.createCourse(req.body);
    return res.status(200).json(response);
  } catch (e) {
    return res.status(404).json({
      message: "ERROR",
    });
  }
};
//update
const updateCourse = async (req, res) => {
  try {
    const courseId = req.params.id;
    const data = req.body;
    if (!courseId) {
      return res.status(200).json({
        status: "ERROR",
        message: "Vui lòng nhập đầy đủ thông tin",
      });
    }
    const response = await courseService.updateCourse(courseId, data);
    return res.status(200).json(response);
  } catch (error) {
    return res.status(404).json({
      message: error,
    });
  }
};

const getAllCourse = async (req, res) => {
  try {
    const { limit, page, sort, filter } = req.query;
    const response = await courseService.getAllCourse(
      Number(limit),
      Number(page) || 0,
      sort,
      filter
    );
    return res.status(200).json(response);
  } catch (error) {
    return res.status(404).json({
      message: error,
    });
  }
};
const getDetailCourse = async (req, res) => {
  try {
    const courseId = req.params.id;
    if (!courseId) {
      return res.status(200).json({
        status: "ERROR",
        message: "Vui lòng nhập đầy đủ thông tin",
      });
    }
    const response = await courseService.getDetailCourse(courseId);
    return res.status(200).json(response);
  } catch (error) {
    return res.status(404).json({
      message: error,
    });
  }
};
const deleteCourse = async (req, res) => {
  try {
    const courseId = req.params.id;
    if (!courseId) {
      return res.status(200).json({
        status: "ERROR",
        message: "Vui lòng nhập đầy đủ thông tin",
      });
    }
    const response = await courseService.deleteCourse(courseId);
    return res.status(200).json(response);
  } catch (error) {
    return res.status(404).json({
      message: error,
    });
  }
};
const addTrackToCourse = async (req, res) => {
  try {
    const courseId = req.params.id;
    const data = req.body;
    if (!courseId) {
      return res.status(200).json({
        status: "ERROR",
        message: "Vui lòng nhập đầy đủ thông tin",
      });
    }
    const response = await courseService.addTrackToCourse(courseId, data);
    return res.status(200).json(response);
  } catch (error) {
    return res.status(404).json({
      message: error,
    });
  }
};

const updateTrack = async (req, res) => {
  try {
    const courseId = req.params.id;
    const trackId = req.params.trackId;
    const trackData = req.body;
    if (!courseId || !trackId) {
      return res.status(200).json({
        status: "ERROR",
        message: "Vui lòng nhập đầy đủ thông tin",
      });
    }
    const response = await courseService.updateTrack(
      courseId,
      trackId,
      trackData
    );
    return res.status(200).json(response);
  } catch (error) {
    return res.status(404).json({
      message: error,
    });
  }
};

const deleteTrack = async (req, res) => {
  try {
    const courseId = req.params.id;
    const trackId = req.params.trackId;
    const trackData = req.body;
    if (!courseId || !trackId) {
      return res.status(200).json({
        status: "ERROR",
        message: "Vui lòng nhập đầy đủ thông tin",
      });
    }
    const response = await courseService.deleteTrack(
      courseId,
      trackId,
      trackData
    );
    return res.status(200).json(response);
  } catch (error) {
    return res.status(404).json({
      message: error,
    });
  }
};
const addLessonToCourse = async (req, res) => {
  try {
    const courseId = req.params.id;
    const trackId = req.params.trackId;
    const data = req.body;
    if (!courseId || !trackId) {
      return res.status(200).json({
        status: "ERROR",
        message: "Vui lòng nhập đầy đủ thông tin",
      });
    }
    const response = await courseService.addLessonToCourse(
      courseId,
      trackId,
      data
    );
    return res.status(200).json(response);
  } catch (error) {
    return res.status(404).json({
      message: error,
    });
  }
};

const deleteLessonInCourse = async (req, res) => {
  try {
    const courseId = req.params.id;
    const trackId = req.params.trackId;
    const lessonId = req.params.lessonId;
    if (!courseId || !trackId) {
      return res.status(200).json({
        status: "ERROR",
        message: "Vui lòng nhập đầy đủ thông tin",
      });
    }
    const response = await courseService.deleteLessonInCourse(
      courseId,
      trackId,
      lessonId
    );
    return res.status(200).json(response);
  } catch (error) {
    return res.status(404).json({
      message: error,
    });
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
};
