"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import {
  FaFacebookF,
  FaInstagram,
  FaPhoneAlt,
  FaRegClock,
  FaRegEnvelope,
} from "react-icons/fa";
import {
  AppSection,
  ContactDetail,
  contactHours,
  contactSection,
  getContactActions,
  SocialPlatform,
  type ContactAction,
} from "@/config";
import SectionHeader from "@/components/motion/SectionHeader";
import {
  validateContact,
  validateContactField,
  type ContactErrors,
  type ContactField,
} from "@/lib/contact-message";
import { suggestEmail } from "@/lib/email";
import { submitContact } from "@/lib/submit-contact";
import {
  fadeUp,
  staggerContainer,
  staggerItem,
  viewportReveal,
} from "@/lib/motion";

const actionIcons: Record<ContactAction["id"], typeof FaRegEnvelope> = {
  [ContactDetail.Email]: FaRegEnvelope,
  [ContactDetail.Phone]: FaPhoneAlt,
  [SocialPlatform.Instagram]: FaInstagram,
  [SocialPlatform.Facebook]: FaFacebookF,
};

export default function Contact() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: "",
  });
  const [status, setStatus] = useState<
    "idle" | "loading" | "success" | "error"
  >("idle");
  const [feedback, setFeedback] = useState("");
  const [errors, setErrors] = useState<ContactErrors>({});
  const [touched, setTouched] = useState<
    Partial<Record<ContactField, boolean>>
  >({});

  const contactActions = getContactActions();
  const emailSuggestion = touched.email ? suggestEmail(formData.email) : null;

  const setFieldError = (field: ContactField, value: string) => {
    setErrors((prev) => ({
      ...prev,
      [field]: validateContactField(field, value) ?? undefined,
    }));
  };

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) => {
    const field = e.target.name as ContactField;
    setStatus("idle");
    setFormData({ ...formData, [field]: e.target.value });
    if (touched[field]) setFieldError(field, e.target.value);
  };

  const handleBlur = (
    e: React.FocusEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) => {
    const field = e.target.name as ContactField;
    if (!e.target.value.trim() && !touched[field]) return;
    setTouched((prev) => ({ ...prev, [field]: true }));
    setFieldError(field, e.target.value);
  };

  const applyEmailSuggestion = () => {
    if (!emailSuggestion) return;
    setFormData({ ...formData, email: emailSuggestion });
    setFieldError("email", emailSuggestion);
  };

  const fieldProps = (field: ContactField) => ({
    id: `contact-${field}`,
    name: field,
    value: formData[field],
    onChange: handleChange,
    onBlur: handleBlur,
    "aria-invalid": Boolean(errors[field]),
    "aria-describedby": errors[field] ? `contact-${field}-error` : undefined,
    className: `${inputClass} ${errors[field] ? errorInputClass : ""}`,
  });

  const fieldError = (field: ContactField) =>
    errors[field] ? (
      <p
        id={`contact-${field}-error`}
        className="text-sm text-red-800 -mt-1.5 text-left"
      >
        {errors[field]}
      </p>
    ) : null;

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const nextErrors = validateContact(formData);
    setErrors(nextErrors);
    setTouched({ name: true, email: true, message: true });
    const firstInvalid = (["name", "email", "message"] as const).find(
      (field) => nextErrors[field],
    );
    if (firstInvalid) {
      e.currentTarget
        .querySelector<HTMLElement>(`#contact-${firstInvalid}`)
        ?.focus();
      return;
    }

    setStatus("loading");
    setFeedback("");

    try {
      const result = await submitContact(formData);
      if (!result.ok) {
        setStatus("error");
        setFeedback(result.error);
        return;
      }

      setStatus("success");
      if (result.via === "web3forms") {
        setFeedback(contactSection.submitSuccessWeb3);
        setFormData({ name: "", email: "", message: "" });
        setTouched({});
        setErrors({});
      } else {
        setFeedback(contactSection.submitSuccessMailto);
      }
    } catch (err) {
      setStatus("error");
      setFeedback(
        err instanceof Error
          ? err.message
          : "Coś poszło nie tak. Spróbuj ponownie.",
      );
    }
  };

  const inputClass =
    "w-full px-3.5 py-2.5 text-base rounded-lg border border-accent-soft/60 bg-white/80 text-text placeholder:text-text-muted/60 placeholder:text-sm focus:border-primary focus:ring-2 focus:ring-ring transition outline-none min-h-11";
  const errorInputClass = "!border-red-700/70 focus:!ring-red-700/25";

  return (
    <section
      id={AppSection.Contact}
      className="relative section-padding scroll-mt-header overflow-hidden"
      aria-labelledby="contact-heading"
    >
      <div
        className="ambient-orb ambient-orb-e pointer-events-none"
        aria-hidden
      />

      <div className="container-custom relative section-stack">
        <div className="flex flex-col items-center gap-3 sm:gap-3.5">
          <SectionHeader
            label={contactSection.sectionLabel}
            titleId="contact-heading"
          />
          <motion.p
            initial="hidden"
            whileInView="visible"
            viewport={viewportReveal}
            variants={fadeUp}
            className="contact-hours"
          >
            <FaRegClock
              size={12}
              className="text-accent shrink-0"
              aria-hidden
            />
            <span>
              <span className="font-semibold text-text">
                {contactHours.label}:
              </span>{" "}
              {contactHours.value}
            </span>
          </motion.p>
        </div>

        <div className="contact-stack">
          <motion.ul
            initial="hidden"
            whileInView="visible"
            viewport={viewportReveal}
            variants={staggerContainer}
            className="contact-actions"
          >
            {contactActions.map((action) => {
              const Icon = actionIcons[action.id];
              return (
                <motion.li key={action.id} variants={staggerItem}>
                  <a
                    href={action.href}
                    aria-label={action.ariaLabel}
                    {...(action.external
                      ? { target: "_blank", rel: "noopener noreferrer" }
                      : {})}
                    className="contact-action card-glass card-interactive"
                  >
                    <span className="contact-action-icon" aria-hidden>
                      <Icon size={14} />
                    </span>
                    <span className="contact-action-text">
                      <span className="contact-action-label">
                        {action.label}
                      </span>
                      {action.value && (
                        <span className="contact-action-value">
                          {action.value}
                        </span>
                      )}
                    </span>
                  </a>
                </motion.li>
              );
            })}
          </motion.ul>

          <motion.form
            onSubmit={handleSubmit}
            noValidate
            initial="hidden"
            whileInView="visible"
            viewport={viewportReveal}
            variants={fadeUp}
            transition={{ delay: 0.04 }}
            className="contact-form-card card-glass card-interactive card-padding flex flex-col gap-3"
          >
            <p className="text-[0.8125rem] text-text-muted leading-relaxed text-center text-balance pb-3 mb-1 border-b border-accent/25">
              {contactSection.formIntro}
            </p>

            <input
              type="text"
              required
              autoComplete="name"
              aria-label={contactSection.formPlaceholders.name}
              placeholder={contactSection.formPlaceholders.name}
              {...fieldProps("name")}
            />
            {fieldError("name")}

            <input
              type="email"
              required
              autoComplete="email"
              inputMode="email"
              autoCapitalize="off"
              autoCorrect="off"
              spellCheck={false}
              aria-label={contactSection.formPlaceholders.email}
              placeholder={contactSection.formPlaceholders.email}
              {...fieldProps("email")}
            />
            {fieldError("email")}
            {emailSuggestion && (
              <p className="text-sm text-text-muted -mt-1.5 text-left">
                Czy chodziło o{" "}
                <button
                  type="button"
                  onClick={applyEmailSuggestion}
                  className="font-semibold text-primary-dark underline underline-offset-4 hover:text-primary"
                >
                  {emailSuggestion}
                </button>
                ?
              </p>
            )}

            <textarea
              required
              rows={5}
              aria-label={contactSection.formPlaceholders.message}
              placeholder={contactSection.formPlaceholders.message}
              {...fieldProps("message")}
              className={`${fieldProps("message").className} resize-y min-h-[120px]`}
            />
            {fieldError("message")}

            <motion.button
              type="submit"
              disabled={status === "loading"}
              whileHover={status === "loading" ? undefined : { y: -2 }}
              whileTap={status === "loading" ? undefined : { scale: 0.99 }}
              className="btn-primary w-full !min-h-11"
            >
              {status === "loading"
                ? contactSection.submitLoading
                : contactSection.submitEmail}
            </motion.button>

            {feedback && (
              <motion.p
                role="status"
                initial={{ opacity: 0, y: 8 }}
                animate={{ opacity: 1, y: 0 }}
                className={`text-sm rounded-lg py-2.5 px-3 ${
                  status === "error"
                    ? "text-red-900 bg-red-50 border border-red-100"
                    : "text-primary-dark bg-primary/10 border border-primary/15"
                }`}
              >
                {feedback}
              </motion.p>
            )}
          </motion.form>
        </div>
      </div>
    </section>
  );
}
