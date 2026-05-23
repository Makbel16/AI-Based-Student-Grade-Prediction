/** Client-side validation mirroring backend rules */
export const validateForm = (form) => {
  const errors = {};
  const percentFields = [
    "attendance",
    "assignment",
    "quiz",
    "mid_exam",
    "final_exam",
  ];

  percentFields.forEach((field) => {
    const value = form[field];
    if (value === "" || value === null || value === undefined) {
      errors[field] = "Required";
    } else if (isNaN(Number(value))) {
      errors[field] = "Must be a number";
    } else if (Number(value) < 0 || Number(value) > 100) {
      errors[field] = "Must be 0–100";
    }
  });

  if (form.study_hours === "" || form.study_hours == null) {
    errors.study_hours = "Required";
  } else if (isNaN(Number(form.study_hours))) {
    errors.study_hours = "Must be a number";
  } else if (Number(form.study_hours) < 0 || Number(form.study_hours) > 24) {
    errors.study_hours = "Must be 0–24 hours";
  }

  return errors;
};

export const categoryStyles = {
  Excellent: "bg-emerald-500/20 text-emerald-300 border-emerald-500/40",
  Good: "bg-sky-500/20 text-sky-300 border-sky-500/40",
  Average: "bg-amber-500/20 text-amber-300 border-amber-500/40",
  Poor: "bg-rose-500/20 text-rose-300 border-rose-500/40",
};
