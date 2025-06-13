import React, { useState } from "react";
import { Button } from "./ui/button";
import { Label } from "./ui/label";

export default function CourseForm() {
  const defaultFormData = {name: "", email: "", experience_level: "beginner", interests: "", form_name: "Rust Course Interest Form"};
  const [formData, setFormData] = useState(defaultFormData);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState<"success" | "error" | null>(null);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setSubmitStatus(null);

    try {
      const response = await fetch("http://127.0.0.1:8000/api/submit-form/", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      if (response.ok) {
        setSubmitStatus("success");
        setFormData(defaultFormData);
      } else {
        setSubmitStatus("error");
      }
    } catch (error) {
      setSubmitStatus("error");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-5 w-full max-w-md">
      <div className="space-y-2">
        <Label htmlFor="name" className="text-base">Name</Label>
        <input
          type="text"
          id="name"
          name="name"
          value={formData.name}
          onChange={handleInputChange}
          required
          className="w-full px-3 py-2 bg-background border border-input rounded-md focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
        />
      </div>

      <div className="space-y-2">
        <Label htmlFor="email" className="text-base">Email</Label>
        <input
          type="email"
          id="email"
          name="email"
          value={formData.email}
          onChange={handleInputChange}
          required
          className="w-full px-3 py-2 bg-background border border-input rounded-md focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
        />
      </div>

      <div className="space-y-2">
        <Label htmlFor="experience_level" className="text-base">Experience Level</Label>
        <select
          id="experience_level"
          name="experience_level"
          value={formData.experience_level}
          onChange={handleInputChange}
          required
          className="w-full px-3 py-2 bg-background border border-input rounded-md focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
        >
          <option value="beginner">Beginner - New to programming</option>
          <option value="intermediate">Intermediate - Familiar with other languages</option>
          <option value="advanced">Advanced - Some Rust experience</option>
          <option value="expert">Expert - Looking to deepen knowledge</option>
        </select>
      </div>

      <div className="space-y-2">
        <Label htmlFor="interests" className="text-base">What are you most interested in learning?</Label>
        <textarea
          id="interests"
          name="interests"
          value={formData.interests}
          onChange={handleInputChange}
          rows={3}
          className="w-full px-3 py-2 bg-background border border-input rounded-md focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
        />
        <p className="text-sm text-muted-foreground">
          Tell us what Rust topics you're most excited about
        </p>
      </div>

      <input name="form_name" type="hidden" value={formData.form_name} />
      
      <Button
        type="submit"
        disabled={isSubmitting}
        className="w-full bg-primary hover:bg-primary/90"
      >
        {isSubmitting ? "Submitting..." : "Express Interest"}
      </Button>

      {submitStatus === "success" && (
        <div className="p-3 bg-green-100 border border-green-400 text-green-700 rounded">
          Thanks for your interest! We'll notify you when the course launches.
        </div>
      )}

      {submitStatus === "error" && (
        <div className="p-3 bg-red-100 border border-red-400 text-red-700 rounded">
          There was an error submitting the form. Please try again.
        </div>
      )}
    </form>
  );
}