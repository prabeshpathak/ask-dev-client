import React, { useState, useContext } from "react";
import { useRouter } from "next/router";
import { Formik } from "formik";
import * as Yup from "yup";

import { FetchContext } from "../../../store/fetch";

import Button from "../../button";
import Textarea from "../../textarea";
import FormInput from "../../form-input";
import TagInput from "../../tag-input";

import styles from "./question-form.module.css";

const QuestionForm = () => {
  const router = useRouter();
  const { authAxios } = useContext(FetchContext);

  const [loading, setLoading] = useState(false);
  const [fileInputState, setFileInputState] = useState("");
  const [previewSource, setPreviewSource] = useState("");
  const [selectedFile, setSelectedFile] = useState();

  const handleFileInputChange = (e) => {
    const file = e.target.files[0];
    previewFile(file);
    setSelectedFile(file);
    setFileInputState(e.target.value);
  };

  const previewFile = (file) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onloadend = () => {
      setPreviewSource(reader.result);
    };
  };

  const uploadImage = (base64EncodedImage)=>{
    console.log(base64EncodedImage)
  }

  return (
    <Formik
      initialValues={{ title: "", text: "", tags: [] }}
      onSubmit={async (values, { setStatus, resetForm }) => {
        setLoading(true);
        try {
          values.imageEncoded = previewSource;
          await authAxios.post("questions", values);
          resetForm({});
          router.push("/");
        } catch (error) {
          setStatus(error.response.data.message);
        }
        setLoading(false);
      }}
      validationSchema={Yup.object({
        title: Yup.string()
          .required("Title is missing.")
          .max(150, "Title cannot be longer than 150 characters.")
          .min(15, "Title must be at least 15 characters."),
        text: Yup.string()
          .required("Body is missing.")
          .min(30, "Body must be at least 30 characters.")
          .max(30000, "Body cannot be longer than 30000 characters."),
        tags: Yup.array()
          .required("Please enter at least one tag.")
          .max(5, "Please enter no more than 5 tags.")
          .of(
            Yup.string().max(15, "Tag cannot be longer than 15 characters. ")
          ),
      })}
    >
      {({
        values,
        errors,
        touched,
        status,
        handleChange,
        setFieldValue,
        handleBlur,
        handleSubmit,
        isSubmitting,
      }) => (
        <form onSubmit={handleSubmit}>
          <div className={styles.container}>
            <FormInput
              label="Title"
              inputInfo="Please be specific about what you are asking!!"
              type="text"
              name="title"
              autoComplete="off"
              value={values.title}
              onChange={handleChange}
              onBlur={handleBlur}
              hasError={touched.title && errors.title}
              errorMessage={errors.title && errors.title}
              placeholder="e.g Should I learn DSA for landing job at Google?"
            />
            <Textarea
              label="Body"
              inputInfo="Add extra information about the question you are asking"
              name="text"
              autoComplete="off"
              value={values.text}
              onChange={handleChange}
              onBlur={handleBlur}
              hasError={touched.text && errors.text}
              errorMessage={errors.text && errors.text}
            />
            <TagInput
              label="Tags"
              inputInfo="Maximum of 5 Tags"
              type="text"
              name="tags"
              value={values.tags}
              onChange={(e) => setFieldValue("tags", e, true)}
              onBlur={handleBlur}
              hasError={touched.tags && errors.tags}
              errorMessage={errors.tags && errors.tags}
            />
            <br/>
            <p>**Selected if any image required</p>
            <input
              id="fileInput"
              type="file"
              name="image"
              onChange={handleFileInputChange}
              value={fileInputState}
              className="form-input"
            />
            {previewSource && (
                <img
                    src={previewSource}
                    alt="chosen"
                    style={{ height: '300px' }}
                />
            )}
          </div>
          <div className={styles.buttonContainer}>
            <p className={styles.status}>{status}</p>
            <div>
              <Button
                type="submit"
                primary
                isLoading={loading}
                disabled={isSubmitting}
              >
                Review your question
              </Button>
            </div>
          </div>
        </form>
      )}
    </Formik>
  );
};

export default QuestionForm;
