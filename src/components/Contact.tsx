"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { FaFacebookF, FaInstagram } from "react-icons/fa";
import {
  AppSection,
  contactSection,
  getContactDetails,
  socialProfiles,
  SocialPlatform,
} from "@/config";
import SectionHeader from "@/components/motion/SectionHeader";
import Reveal from "@/components/motion/Reveal";
import RichCopy from "@/lib/rich-copy";
import { submitContact } from "@/lib/submit-contact";
import {
  fadeUp,
  slideFromLeft,
  slideFromRight,
  viewportReveal,
} from "@/lib/motion";

const socialIcons = {
  [SocialPlatform.Facebook]: FaFacebookF,
  [SocialPlatform.Instagram]: FaInstagram,
} as const;

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

  const contactDetails = getContactDetails();

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) => {
    setStatus("idle");
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
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
      } else {
        setFeedback(contactSection.submitSuccessMailto);
      }
    } catch (err) {
      setStatus("error");
      setFeedback(
        err instanceof Error ? err.message : "Coś poszło nie tak. Spróbuj ponownie.",
      );
    }
  };

  const inputClass =
    "w-full px-3.5 py-2.5 text-base rounded-lg border border-accent-soft/60 bg-white/80 text-text placeholder:text-text-muted/60 focus:border-primary focus:ring-2 focus:ring-ring transition outline-none min-h-11";

  return (
    <section
      id={AppSection.Contact}
      className="relative section-padding scroll-mt-header overflow-hidden"
      aria-labelledby="contact-heading"
    >
      <div className="ambient-orb ambient-orb-e pointer-events-none" aria-hidden />

      <div className="container-custom relative section-stack">
        <div className="space-y-3">
          <SectionHeader
            label={contactSection.sectionLabel}
            title={contactSection.title}
            titleId="contact-heading"
          />
          <motion.p
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.5 }}
            variants={fadeUp}
            className="section-lead"
          >
            <RichCopy>{contactSection.lead}</RichCopy>
          </motion.p>
        </div>

        <div className="contact-layout">
          <Reveal
            variants={slideFromLeft}
            as="div"
            className="card-glass card-interactive card-padding contact-info-card flex flex-col gap-4"
          >
            <div>
              <p className="text-[0.6875rem] uppercase font-semibold tracking-[0.16em] text-accent mb-2">
                {contactSection.socialHeading}
              </p>
              <div className="contact-social-row flex flex-wrap gap-2">
                {socialProfiles.map((profile) => {
                  const Icon = socialIcons[profile.platform];
                  return (
                    <motion.a
                      key={profile.platform}
                      href={profile.href}
                      target="_blank"
                      rel="noopener noreferrer"
                      aria-label={profile.label}
                      whileHover={{ y: -2, scale: 1.03 }}
                      whileTap={{ scale: 0.98 }}
                      className="social-icon-btn !w-11 !h-11"
                    >
                      <Icon size={18} aria-hidden />
                    </motion.a>
                  );
                })}
              </div>
            </div>

            <dl className="space-y-3.5">
              {contactDetails.map((item) => (
                <div key={item.id}>
                  <dt className="text-[0.6875rem] uppercase font-semibold tracking-[0.16em] text-accent mb-1">
                    {item.label}
                  </dt>
                  <dd className="text-text text-[0.9375rem] md:text-base break-words [overflow-wrap:anywhere]">
                    {item.href ? (
                      <a
                        href={item.href}
                        className="hover:text-primary-dark underline-offset-4 hover:underline transition-colors break-words [overflow-wrap:anywhere]"
                      >
                        {item.value}
                      </a>
                    ) : (
                      item.value
                    )}
                  </dd>
                </div>
              ))}
            </dl>
          </Reveal>

          <motion.form
            onSubmit={handleSubmit}
            initial="hidden"
            whileInView="visible"
            viewport={viewportReveal}
            variants={slideFromRight}
            transition={{ delay: 0.04 }}
            className="contact-form-card card-glass card-interactive card-padding flex flex-col gap-3 w-full max-w-xl lg:max-w-none"
          >
            <p className="text-sm text-text-muted leading-snug text-left">
              {contactSection.formIntro}
            </p>

            <input
              type="text"
              name="name"
              required
              autoComplete="name"
              placeholder={contactSection.formPlaceholders.name}
              value={formData.name}
              onChange={handleChange}
              className={inputClass}
            />
            <input
              type="email"
              name="email"
              required
              autoComplete="email"
              placeholder={contactSection.formPlaceholders.email}
              value={formData.email}
              onChange={handleChange}
              className={inputClass}
            />
            <textarea
              name="message"
              required
              rows={5}
              placeholder={contactSection.formPlaceholders.message}
              value={formData.message}
              onChange={handleChange}
              className={`${inputClass} resize-y min-h-[120px]`}
            />

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
