import React from "react"
import { useForm } from "react-hook-form"
import { yupResolver } from "@hookform/resolvers/yup"
import * as yup from "yup"

const schema = yup.object({
  fullName: yup.string().min(3).required(),
  subject: yup.string().min(3).required(),
  email: yup.string().email().required(),
  message: yup.string().min(3).required(),
})

const errorMessages = {
  fullName: "Full name is required",
  subject: "Subject is required",
  email: "Email is required",
  message: "Message is required",
}

function ContactPage() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(schema),
  })

  const onSubmit = (data) => {
    console.log("Form Data:", data)
  }

  return (
    <div className="container mt-5 col-md-6">
      <h2 className="text-center">Contact Holidaze</h2>
      <form onSubmit={handleSubmit(onSubmit)}>
        <div className="mb-3">
          <label htmlFor="fullName" className="form-label">
            Full Name
          </label>
          <input
            type="text"
            className={`form-control ${errors.fullName ? "is-invalid" : ""}`}
            id="fullName"
            {...register("fullName")}
          />
          {errors.fullName && (
            <div className="invalid-feedback">{errorMessages.fullName}</div>
          )}
        </div>
        <div className="mb-3">
          <label htmlFor="subject" className="form-label">
            Subject
          </label>
          <input
            type="text"
            className={`form-control ${errors.subject ? "is-invalid" : ""}`}
            id="subject"
            {...register("subject")}
          />
          {errors.subject && (
            <div className="invalid-feedback">{errorMessages.subject}</div>
          )}
        </div>
        <div className="mb-3">
          <label htmlFor="email" className="form-label">
            Email
          </label>
          <input
            type="email"
            className={`form-control ${errors.email ? "is-invalid" : ""}`}
            id="email"
            {...register("email")}
          />
          {errors.email && (
            <div className="invalid-feedback">{errorMessages.email}</div>
          )}
        </div>
        <div className="mb-3">
          <label htmlFor="message" className="form-label">
            Message
          </label>
          <textarea
            className={`form-control ${errors.message ? "is-invalid" : ""}`}
            id="message"
            {...register("message")}
          ></textarea>
          {errors.message && (
            <div className="invalid-feedback">{errorMessages.message}</div>
          )}
        </div>
        <div className="d-flex justify-content-end">
          <button type="submit" className="btn btn-primary text-white">
            Submit
          </button>
        </div>
      </form>
    </div>
  )
}

export default ContactPage
