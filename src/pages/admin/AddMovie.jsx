import { useFormik } from "formik";
import React from "react";
import { movieSchema } from "../../validations/movie";
import axios from "axios";
import { BASE_URL } from "../../constants/api";
import { Link } from "react-router-dom";

const AddMovie = () => {
  const formik = useFormik({
    initialValues: {
      title: "",
      description: "",
      genre: [""],
      cast: [""],
      imdbScore: "",
      movieVideo: null,
      movieCover: null,
      movieTrailer: null,
    },
    validationSchema: movieSchema,
    onSubmit: async (values,actions) => {
      console.log("Form submitted:", values);
      try {
        const response = await axios.post(`${BASE_URL}/movies`, values,{
            headers: { 
              "Content-Type": "multipart/form-data",
              Authorization: `Bearer ${localStorage.getItem("token")}` 
            },
          });
        console.log("Success:", response.data.data);
      } catch (error) {
        console.error("Error:", error);
      }finally{
        actions.resetForm()
      }
    },
  });
  return (
    <>
      <div className="bg-black">
        <img
          className="ml-4"
          width="150"
          height="150"
          src="https://help.nflxext.com/helpcenter/OneTrust/oneTrust_production/consent/87b6a5c0-0104-4e96-a291-092c11350111/01938dc4-59b3-7bbc-b635-c4131030e85f/logos/dd6b162f-1a32-456a-9cfe-897231c7763c/4345ea78-053c-46d2-b11e-09adaef973dc/Netflix_Logo_PMS.png"
          alt=""
        />
        <div className="flex items-center justify-center p-12">
          <div className="mx-auto w-full max-w-[550px]">
          <h1 className="text-white text-4xl font-semibold mb-3">Add Movie</h1>
          <Link to="/admin/dashboard" className="bg-white rounded p-1">Go To Dashboard</Link>
            <form onSubmit={formik.handleSubmit}>
              <div className="mb-5">
                <label className="mb-3 block text-base font-medium text-white">
                  Title
                </label>
                <input
                  type="text"
                  name="title"
                  onChange={formik.handleChange}
                  value={formik.values.title}
                  placeholder="Movie Title"
                  className="w-full rounded-md border border-[#e0e0e0] bg-white py-3 px-6 text-base font-medium text-[#6B7280] outline-none focus:border-[#6A64F1] focus:shadow-md"
                />
                {formik.errors.title && (
                  <div className="text-red-700">{formik.errors.title}</div>
                )}
              </div>
              <div className="mb-5">
                <label className="mb-3 block text-base font-medium text-white">
                  Description
                </label>
                <input
                  type="text"
                  name="description"
                  onChange={formik.handleChange}
                  value={formik.values.description}
                  placeholder="Description"
                  className="w-full rounded-md border border-[#e0e0e0] bg-white py-3 px-6 text-base font-medium text-[#6B7280] outline-none focus:border-[#6A64F1] focus:shadow-md"
                />
                {formik.errors.description && (
                  <div className="text-red-700">
                    {formik.errors.description}
                  </div>
                )}
              </div>
              <div className="mb-5">
                <label className="mb-3 block text-base font-medium text-white">
                  Genre
                </label>
                {formik.values.genre.map((_, index) => (
                  <div key={index}>
                    <input
                      name={`genre.${index}`}
                      onChange={formik.handleChange}
                      value={formik.values.genre[index]}
                      placeholder="Enter genres"
                      className="w-full rounded-md border border-[#e0e0e0] bg-white py-3 px-6 text-base font-medium text-[#6B7280] outline-none focus:border-[#6A64F1] focus:shadow-md"
                    />
                    <button
                      className="p-1 bg-red-300 rounded text-gray-500 mt-2"
                      type="button"
                      onClick={() => {
                        const newGenres = formik.values.genre.filter(
                          (_, i) => i !== index
                        );
                        formik.setFieldValue("genre", newGenres);
                      }}
                    >
                      Remove
                    </button>
                  </div>
                ))}
                <button
                  type="button"
                  className="p-1 bg-white rounded mt-2"
                  onClick={() =>
                    formik.setFieldValue("genre", [...formik.values.genre, ""])
                  }
                >
                  Add Genre
                </button>
                {formik.errors.genre && (
                  <div className="text-red-700">{formik.errors.genre}</div>
                )}
              </div>
              <div className="-mx-3 flex flex-wrap">
                <div className="w-full px-3 sm:w-1/2">
                  <div className="mb-5">
                    <label className="mb-3 block text-base font-medium text-white">
                      Cast
                    </label>
                    {formik.values.cast.map((_, index) => (
                      <div key={index}>
                        <input
                          name={`cast.${index}`}
                          onChange={formik.handleChange}
                          value={formik.values.cast[index]}
                          className="w-full rounded-md border border-[#e0e0e0] bg-white py-3 px-6 text-base font-medium text-[#6B7280] outline-none focus:border-[#6A64F1] focus:shadow-md"
                        />
                        <button
                        className="p-1 bg-red-300 rounded text-gray-500 mt-2 mr-2"
                          type="button"
                          onClick={() => {
                            const newCast = formik.values.cast.filter(
                              (_, i) => i !== index
                            );
                            formik.setFieldValue("cast", newCast);
                          }}
                        >
                          Remove
                        </button>
                        <button
                        className="p-1 bg-white rounded mt-2"
                          type="button"
                          onClick={() =>
                            formik.setFieldValue("cast", [
                              ...formik.values.cast,
                              "",
                            ])
                          }
                        >
                          Add Cast
                        </button>
                        {formik.errors.cast && (
                          <div className="text-red-700">{formik.errors.cast}</div>
                        )}
                      </div>
                    ))}
                  </div>
                </div>
                <div className="w-full px-3 sm:w-1/2">
                  <div className="mb-5">
                    <label className="mb-3 block text-base font-medium text-white">
                      IMDB Score
                    </label>
                    <input
                      type="number"
                      name="imdbScore"
                      onChange={formik.handleChange}
                      value={formik.values.imdbScore}
                      className="w-full rounded-md border border-[#e0e0e0] bg-white py-3 px-6 text-base font-medium text-[#6B7280] outline-none focus:border-[#6A64F1] focus:shadow-md"
                    />
                    {formik.errors.imdbScore && (
                      <div className="text-red-700">
                        {formik.errors.imdbScore}
                      </div>
                    )}
                  </div>
                </div>
              </div>

              <div className="pt-3">
                <label className="mb-3 block text-base font-medium text-white">
                  Movie Video File
                </label>
                <div className="-mx-3 flex flex-wrap">
                  <div className="w-full px-3 sm:w-1/2">
                    <div className="mb-5">
                      <input
                        type="file"
                        onChange={(event) =>
                          formik.setFieldValue(
                            "movieVideo",
                            event.currentTarget.files[0]
                          )
                        }
                        className="w-full rounded-md border border-[#e0e0e0] bg-white py-3 px-6 text-base font-medium text-[#6B7280] outline-none focus:border-[#6A64F1] focus:shadow-md"
                      />
                      {formik.errors.movieVideo && (
                        <div className="text-red-700">{formik.errors.movieVideo}</div>
                      )}
                    </div>
                  </div>
                </div>
              </div>
              <div className="pt-3">
                <label className="mb-3 block text-base font-medium text-white">
                  Movie Cover File
                </label>
                <div className="-mx-3 flex flex-wrap">
                  <div className="w-full px-3 sm:w-1/2">
                    <div className="mb-5">
                      <input
                        type="file"
                        onChange={(event) =>
                          formik.setFieldValue(
                            "movieCover",
                            event.currentTarget.files[0]
                          )
                        }
                        className="w-full rounded-md border border-[#e0e0e0] bg-white py-3 px-6 text-base font-medium text-[#6B7280] outline-none focus:border-[#6A64F1] focus:shadow-md"
                      />
                      {formik.errors.movieCover && (
                        <div className="text-red-700">{formik.errors.movieCover}</div>
                      )}
                    </div>
                  </div>
                </div>
              </div>
              <div className="pt-3">
                <label className="mb-3 block text-base font-medium text-white">
                  Movie Trailer File
                </label>
                <div className="-mx-3 flex flex-wrap">
                  <div className="w-full px-3 sm:w-1/2">
                    <div className="mb-5">
                      <input
                        type="file"
                        onChange={(event) =>
                          formik.setFieldValue(
                            "movieTrailer",
                            event.currentTarget.files[0]
                          )
                        }
                        className="w-full rounded-md border border-[#e0e0e0] bg-white py-3 px-6 text-base font-medium text-[#6B7280] outline-none focus:border-[#6A64F1] focus:shadow-md"
                      />
                      {formik.errors.movieTrailer && (
                        <div className="text-red-700">
                          {formik.errors.movieTrailer}
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              </div>
              <div>
                <button
                  type="submit"
                  className="bg-red-600 text-white rounded px-24 py-3 block mx-auto mb-2"
                >
                  Add
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </>
  );
};

export default AddMovie;
