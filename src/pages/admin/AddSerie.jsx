import React, { useState } from "react";
import { useFormik } from "formik";
import { seriesSchema } from "../../validations/serie";
import axios from "axios";

const api = axios.create({
  baseURL: 'https://mvcfolder-api.onrender.com/api/v1',
  timeout: 120000, 
  headers: {
    'Accept': 'application/json',
    'Access-Control-Allow-Origin': '*',
    'Access-Control-Allow-Methods': 'GET,PUT,POST,DELETE,PATCH,OPTIONS',
  },
  withCredentials: false,
  maxContentLength: Infinity,
  maxBodyLength: Infinity
});

api.interceptors.request.use((config) => {
  const token = localStorage.getItem('token');
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
}, (error) => {
  return Promise.reject(error);
});

const AddSerie = () => {
  const [submitStatus, setSubmitStatus] = useState({ error: null, success: false });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [uploadProgress, setUploadProgress] = useState(0);

  const formik = useFormik({
    initialValues: {
      title: "",
      description: "",
      genre: [""],
      cast: [""],
      imdbScore: "",
      serieVideos: [null],
      serieCover: null,
      serieTrailer: null,
      serieCount: "",
      seasonCount: "",
    },
    validationSchema: seriesSchema,
    onSubmit: async (values, actions) => {
      if (isSubmitting) return;
      
      setIsSubmitting(true);
      setSubmitStatus({ error: null, success: false });
      setUploadProgress(0);

      try {
        const formData = new FormData();
        
        Object.keys(values).forEach(key => {
          if (key !== 'serieVideos' && key !== 'serieCover' && key !== 'serieTrailer') {
            if (Array.isArray(values[key])) {
              values[key].forEach(value => {
                formData.append(key, value);
              });
            } else {
              formData.append(key, values[key]);
            }
          }
        });

        if (values.serieCover) {
          formData.append('serieCover', values.serieCover);
        }
        
        if (values.serieTrailer) {
          formData.append('serieTrailer', values.serieTrailer);
        }
        
        values.serieVideos.forEach((video, index) => {
          if (video) {
            formData.append('serieVideos', video);
          }
        });

        const response = await api.post('/series', formData, {
          headers: { 'Content-Type': 'multipart/form-data' },
          onUploadProgress: (progressEvent) => {
            const percentCompleted = Math.round((progressEvent.loaded * 100) / progressEvent.total);
            setUploadProgress(percentCompleted);
          }
        });
        
        if (response.data.status === 'success') {
          setSubmitStatus({ error: null, success: true });
          actions.resetForm();
        } else {
          throw new Error(response.data.message || 'Failed to create series');
        }
      } catch (error) {
        console.error('Upload error:', error);
        setSubmitStatus({ 
          error: error.message || 'An error occurred while uploading the series', 
          success: false 
        });
      } finally {
        setIsSubmitting(false);
        setUploadProgress(0);
      }
    },
  });

  return (
    <div className="bg-black">
      <img
        className="ml-4"
        width="150"
        height="150"
        src="https://help.nflxext.com/helpcenter/OneTrust/oneTrust_production/consent/87b6a5c0-0104-4e96-a291-092c11350111/01938dc4-59b3-7bbc-b635-c4131030e85f/logos/dd6b162f-1a32-456a-9cfe-897231c7763c/4345ea78-053c-46d2-b11e-09adaef973dc/Netflix_Logo_PMS.png"
        alt="Netflix Logo"
      />
      <div className="flex items-center justify-center p-12">
        <div className="mx-auto w-full max-w-[550px]">
          {submitStatus.error && (
            <div className="mb-4 p-3 bg-red-100 border border-red-400 text-red-700 rounded">
              {submitStatus.error}
            </div>
          )}
          {submitStatus.success && (
            <div className="mb-4 p-3 bg-green-100 border border-green-400 text-green-700 rounded">
              Series added successfully!
            </div>
          )}
          
          <form onSubmit={formik.handleSubmit} encType="multipart/form-data">
            <div className="mb-5">
              <label className="mb-3 block text-base font-medium text-white">
                Title:
              </label>
              <input
                className="w-full rounded-md border border-[#e0e0e0] bg-white py-3 px-6 text-base font-medium text-[#6B7280] outline-none focus:border-[#6A64F1] focus:shadow-md"
                name="title"
                onChange={formik.handleChange}
                value={formik.values.title}
              />
              {formik.errors.title && (
                <div className="text-red-700">{formik.errors.title}</div>
              )}
            </div>

            <div className="mb-5">
              <label className="mb-3 block text-base font-medium text-white">
                Description:
              </label>
              <textarea
                className="w-full rounded-md border border-[#e0e0e0] bg-white py-3 px-6 text-base font-medium text-[#6B7280] outline-none focus:border-[#6A64F1] focus:shadow-md"
                name="description"
                onChange={formik.handleChange}
                value={formik.values.description}
              />
              {formik.errors.description && (
                <div className="text-red-700">{formik.errors.description}</div>
              )}
            </div>

            <div className="mb-5">
              <label className="mb-3 block text-base font-medium text-white">
                Cast
              </label>
              {formik.values.cast.map((_, index) => (
                <div key={index} className="mb-2">
                  <input
                    name={`cast.${index}`}
                    onChange={formik.handleChange}
                    value={formik.values.cast[index]}
                    className="w-full rounded-md border border-[#e0e0e0] bg-white py-3 px-6 text-base font-medium text-[#6B7280] outline-none focus:border-[#6A64F1] focus:shadow-md"
                  />
                  <div className="mt-2">
                    <button
                      className="px-3 py-1 bg-red-500 text-white rounded mr-2"
                      type="button"
                      onClick={() => {
                        const newCast = formik.values.cast.filter((_, i) => i !== index);
                        formik.setFieldValue("cast", newCast);
                      }}
                    >
                      Remove
                    </button>
                    {index === formik.values.cast.length - 1 && (
                      <button
                        className="px-3 py-1 bg-blue-500 text-white rounded"
                        type="button"
                        onClick={() => formik.setFieldValue("cast", [...formik.values.cast, ""])}
                      >
                        Add Cast
                      </button>
                    )}
                  </div>
                </div>
              ))}
            </div>

            <div className="mb-5">
              <label className="mb-3 block text-base font-medium text-white">
                Genre
              </label>
              {formik.values.genre.map((_, index) => (
                <div key={index} className="mb-2">
                  <input
                    name={`genre.${index}`}
                    onChange={formik.handleChange}
                    value={formik.values.genre[index]}
                    className="w-full rounded-md border border-[#e0e0e0] bg-white py-3 px-6 text-base font-medium text-[#6B7280] outline-none focus:border-[#6A64F1] focus:shadow-md"
                  />
                  <div className="mt-2">
                    <button
                      className="px-3 py-1 bg-red-500 text-white rounded mr-2"
                      type="button"
                      onClick={() => {
                        const newGenres = formik.values.genre.filter((_, i) => i !== index);
                        formik.setFieldValue("genre", newGenres);
                      }}
                    >
                      Remove
                    </button>
                    {index === formik.values.genre.length - 1 && (
                      <button
                        className="px-3 py-1 bg-blue-500 text-white rounded"
                        type="button"
                        onClick={() => formik.setFieldValue("genre", [...formik.values.genre, ""])}
                      >
                        Add Genre
                      </button>
                    )}
                  </div>
                </div>
              ))}
            </div>

            <div className="mb-5">
              <label className="mb-3 block text-base font-medium text-white">
                IMDB Score:
              </label>
              <input
                className="w-full rounded-md border border-[#e0e0e0] bg-white py-3 px-6 text-base font-medium text-[#6B7280] outline-none focus:border-[#6A64F1] focus:shadow-md"
                type="number"
                step="0.1"
                min="0"
                max="10"
                name="imdbScore"
                onChange={formik.handleChange}
                value={formik.values.imdbScore}
              />
              {formik.errors.imdbScore && (
                <div className="text-red-700">{formik.errors.imdbScore}</div>
              )}
            </div>

            <div className="mb-5">
              <label className="mb-3 block text-base font-medium text-white">
                Series Videos
              </label>
              {formik.values.serieVideos.map((_, index) => (
                <div key={index} className="mb-4">
                  <input
                    type="file"
                    accept="video/*"
                    onChange={(event) => {
                      const file = event.currentTarget.files?.[0];
                      formik.setFieldValue(`serieVideos.${index}`, file);
                    }}
                    className="w-full rounded-md border border-[#e0e0e0] bg-white py-3 px-6 text-base font-medium text-[#6B7280] outline-none focus:border-[#6A64F1] focus:shadow-md"
                  />
                  <div className="mt-2">
                    <button
                      className="px-3 py-1 bg-red-500 text-white rounded mr-2"
                      type="button"
                      onClick={() => {
                        const newVideos = formik.values.serieVideos.filter((_, i) => i !== index);
                        formik.setFieldValue("serieVideos", newVideos);
                      }}
                    >
                      Remove
                    </button>
                    {index === formik.values.serieVideos.length - 1 && (
                      <button
                        className="px-3 py-1 bg-blue-500 text-white rounded"
                        type="button"
                        onClick={() => formik.setFieldValue("serieVideos", [...formik.values.serieVideos, null])}
                      >
                        Add Video
                      </button>
                    )}
                  </div>
                </div>
              ))}
            </div>

            <div className="mb-5">
              <label className="mb-3 block text-base font-medium text-white">
                Series Cover:
              </label>
              <input
                className="w-full rounded-md border border-[#e0e0e0] bg-white py-3 px-6 text-base font-medium text-[#6B7280] outline-none focus:border-[#6A64F1] focus:shadow-md"
                type="file"
                accept="image/*"
                onChange={(event) => {
                  const file = event.currentTarget.files?.[0];
                  formik.setFieldValue("serieCover", file);
                }}
              />
              {formik.errors.serieCover && (
                <div className="text-red-700">{formik.errors.serieCover}</div>
              )}
            </div>

            <div className="mb-5">
              <label className="mb-3 block text-base font-medium text-white">
                Series Trailer:
              </label>
              <input
                className="w-full rounded-md border border-[#e0e0e0] bg-white py-3 px-6 text-base font-medium text-[#6B7280] outline-none focus:border-[#6A64F1] focus:shadow-md"
                type="file"
                accept="video/*"
                onChange={(event) => {
                  const file = event.currentTarget.files?.[0];
                  formik.setFieldValue("serieTrailer", file);
                }}
              />
              {formik.errors.serieTrailer && (
                <div className="text-red-700">{formik.errors.serieTrailer}</div>
              )}
            </div>

            <div className="mb-5">
              <label className="mb-3 block text-base font-medium text-white">
                Series Count:
              </label>
              <input
                className="w-full rounded-md border border-[#e0e0e0] bg-white py-3 px-6 text-base font-medium text-[#6B7280] outline-none focus:border-[#6A64F1] focus:shadow-md"
                type="number"
                min="1"
                name="serieCount"
                onChange={formik.handleChange}
                value={formik.values.serieCount}
              />
              {formik.errors.serieCount && (
                <div className="text-red-700">{formik.errors.serieCount}</div>
              )}
            </div>

            <div className="mb-5">
              <label className="mb-3 block text-base font-medium text-white">
                Season Count:
              </label>
              <input
                className="w-full rounded-md border border-[#e0e0e0] bg-white py-3 px-6 text-base font-medium text-[#6B7280] outline-none focus:border-[#6A64F1] focus:shadow-md"
                type="number"
                min="1"
                name="seasonCount"
                onChange={formik.handleChange}
                value={formik.values.seasonCount}
              />
              {formik.errors.seasonCount && (
                <div className="text-red-700">{formik.errors.seasonCount}</div>
              )}
            </div>

            <div className="mb-5">
              {isSubmitting && (
                <div className="w-full bg-gray-200 rounded-full h-2.5 mb-4">
                  <div 
                    className="bg-blue-600 h-2.5 rounded-full" 
                    style={{ width: `${uploadProgress}%` }}
                  ></div>
                </div>
              )}
              <button
                className="w-full bg-red-600 text-white rounded px-24 py-3 hover:bg-red-700 transition-colors disabled:bg-red-400"
                type="submit"
                disabled={isSubmitting}
              >
                {isSubmitting ? 'Uploading...' : 'Submit'}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default AddSerie;