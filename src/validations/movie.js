import * as Yup from "yup";

export const movieSchema = Yup.object().shape({
    title: Yup.string().required("Movie title is required"),
    description: Yup.string().required("Movie description is required"),
    genre: Yup.array()
      .of(Yup.string().required("Each genre must be a string"))
      .min(1, "At least one genre is required"),
    cast: Yup.array()
      .of(Yup.string().required("Each cast member must be a string"))
      .min(1, "At least one cast member is required"),
    imdbScore: Yup.number()
      .required("IMDB score is required")
      .min(0, "Score must be at least 0")
      .max(10, "Score must be at most 10"),
    movieVideo: Yup.mixed().required("Movie video file is required"),
    movieCover: Yup.mixed().required("Movie cover file is required"),
    movieTrailer: Yup.mixed().required("Movie trailer file is required"),
  });