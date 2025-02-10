import * as Yup from 'yup';

export const seriesSchema = Yup.object().shape({
  title: Yup.string()
    .required('Title is required')
    .min(2, 'Title must be at least 2 characters'),
  description: Yup.string()
    .required('Description is required')
    .min(10, 'Description must be at least 10 characters'),
  genre: Yup.array()
    .of(Yup.string().required('Genre cannot be empty'))
    .min(1, 'At least one genre is required'),
  cast: Yup.array()
    .of(Yup.string().required('Cast member name cannot be empty'))
    .min(1, 'At least one cast member is required'),
  imdbScore: Yup.number()
    .required('IMDB Score is required')
    .min(0, 'Score must be at least 0')
    .max(10, 'Score must not exceed 10'),
  serieVideos: Yup.array()
    .of(
      Yup.mixed()
        .test('fileSize', 'File too large', (value) => {
          if (!value) return true;
          return value.size <= 100 * 1024 * 1024;
        })
        .test('fileType', 'Unsupported file type', (value) => {
          if (!value) return true;
          return ['video/mp4', 'video/webm', 'video/ogg'].includes(value.type);
        })
    )
    .min(1, 'At least one video is required'),
  serieCover: Yup.mixed()
    .required('Cover image is required')
    .test('fileSize', 'File too large', (value) => {
      if (!value) return true;
      return value.size <= 5 * 1024 * 1024; 
    })
    .test('fileType', 'Unsupported file type', (value) => {
      if (!value) return true;
      return ['image/jpeg', 'image/png', 'image/webp'].includes(value.type);
    }),
  serieTrailer: Yup.mixed()
    .required('Trailer is required')
    .test('fileSize', 'File too large', (value) => {
      if (!value) return true;
      return value.size <= 100 * 1024 * 1024; 
    })
    .test('fileType', 'Unsupported file type', (value) => {
      if (!value) return true;
      return ['video/mp4', 'video/webm', 'video/ogg'].includes(value.type);
    }),
  serieCount: Yup.number()
    .required('Series count is required')
    .min(1, 'Must have at least 1 series'),
  seasonCount: Yup.number()
    .required('Season count is required')
    .min(1, 'Must have at least 1 season'),
});