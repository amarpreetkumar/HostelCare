import { Camera, Send } from "lucide-react";
import { useState } from "react";
import toast from "react-hot-toast";
import Layout from "../components/Layout";
import API from "../services/api";

function CreateComplaint() {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [category, setCategory] = useState("");
  const [image, setImage] = useState(null);
  const [preview, setPreview] = useState(null);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append("title", title);
    formData.append("description", description);
    formData.append("category", category);
    formData.append("image", image);

    try {
      await API.post("/complaints", formData, {
        headers: { "Content-Type": "multipart/form-data" },
      });
      toast.success("Complaint created successfully");
    } catch (error) {
      toast.error(error.response.data.message);
    }
  };

  return (
    <Layout>
      <section className="space-y-6">
        <header className="animate-fadeup delay-1">
          <h1 className="font-display text-3xl font-semibold">Create Complaint</h1>
          <p className="mt-2 text-sm text-text-mid">Describe your issue clearly for faster resolution</p>
        </header>

        <div className="grid gap-5 lg:grid-cols-[minmax(0,1fr)_18rem]">
          <form
            onSubmit={handleSubmit}
            className="animate-fadeup delay-2 rounded-card border border-border-soft bg-elevated p-7 shadow-card"
          >
            <div className="mb-5">
              <label className="mb-2 block text-[11px] font-semibold uppercase tracking-wider text-text-low">Title</label>
              <input
                type="text"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                placeholder="e.g. Fan not working in Room 204"
                className="w-full rounded-xl border border-border-soft bg-subtle px-4 py-2.5 text-sm text-text-high outline-none transition-all duration-150 placeholder:text-text-low focus:border-primary focus:ring-2 focus:ring-[rgba(255,107,53,0.15)]"
              />
            </div>

            <div className="mb-5">
              <label className="mb-2 block text-[11px] font-semibold uppercase tracking-wider text-text-low">Description</label>
              <textarea
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                className="min-h-24 w-full rounded-xl border border-border-soft bg-subtle px-4 py-2.5 text-sm text-text-high outline-none transition-all duration-150 placeholder:text-text-low focus:border-primary focus:ring-2 focus:ring-[rgba(255,107,53,0.15)]"
              />
            </div>

            <div className="mb-5">
              <label className="mb-2 block text-[11px] font-semibold uppercase tracking-wider text-text-low">Category</label>
              <select
                value={category}
                onChange={(e) => setCategory(e.target.value)}
                className="w-full cursor-pointer appearance-none rounded-xl border border-border-soft bg-subtle px-4 py-2.5 text-sm text-text-high outline-none transition-all duration-150 focus:border-primary focus:ring-2 focus:ring-[rgba(255,107,53,0.15)]"
              >
                <option value="">Select category</option>
                <option value="electricity">Electricity</option>
                <option value="water">Water/Plumbing</option>
                <option value="cleaning">Cleaning</option>
                <option value="internet">Internet/WiFi</option>
                <option value="other">Other</option>
              </select>
            </div>

            <div className="mb-5">
              <label className="mb-2 block text-[11px] font-semibold uppercase tracking-wider text-text-low">Upload Image</label>
              <div className="flex min-h-40 w-full cursor-pointer flex-col items-center justify-center overflow-hidden rounded-xl border-2 border-dashed border-border-soft p-8 text-center transition-all duration-150 hover:border-primary hover:bg-primary-dim">
                {preview ? (
                  <div className="relative flex h-full w-full items-center justify-center">
                    <img src={preview} alt="preview" className="max-h-36 rounded-xl object-contain" />
                    <button
                      type="button"
                      onClick={() => {
                        setImage(null);
                        setPreview(null);
                      }}
                      className="absolute right-2 top-2 cursor-pointer rounded-lg bg-danger px-2 py-1 text-xs text-white transition-all duration-150 active:scale-[0.97]"
                    >
                      Remove
                    </button>
                  </div>
                ) : (
                  <button
                    type="button"
                    onClick={() => document.getElementById("imageUpload").click()}
                    className="flex cursor-pointer flex-col items-center text-text-mid transition-all duration-150 hover:text-text-high active:scale-[0.97]"
                  >
                    <Camera className="mb-2" size={28} />
                    <span className="text-sm">Click or drag image to upload</span>
                    <span className="mt-1 text-[11px] text-text-low">PNG, JPG up to 5MB</span>
                  </button>
                )}
                <input
                  id="imageUpload"
                  type="file"
                  accept="image/*"
                  onChange={(e) => {
                    const file = e.target.files[0];
                    setImage(file);
                    setPreview(URL.createObjectURL(file));
                  }}
                  className="hidden"
                />
              </div>
            </div>

            <button
              type="submit"
              className="flex w-full cursor-pointer items-center justify-center gap-2 rounded-xl py-2.5 text-sm font-semibold text-white transition-all duration-150 hover:brightness-110 active:scale-[0.97]"
              style={{ background: "linear-gradient(135deg,#FF6B35,#E85A25)", boxShadow: "0 2px 12px rgba(255,107,53,0.3)" }}
            >
              <Send size={16} />
              Submit Complaint
            </button>
          </form>

          <aside className="animate-fadeup delay-3 h-fit rounded-card border border-border-soft bg-elevated p-5 shadow-card lg:sticky lg:top-8">
            <h2 className="mb-4 text-sm font-semibold">How it works</h2>
            {[
              ["1", "Submit your complaint", "Share issue details and images."],
              ["2", "Admin reviews it", "The request is checked and assigned."],
              ["3", "Staff resolves it", "Maintenance handles the work."],
              ["4", "You get confirmation", "Status updates keep you informed."],
            ].map(([number, heading, copy]) => (
              <div key={number} className="mb-4 flex items-start gap-3 last:mb-0">
                <span className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-primary-dim text-xs font-semibold text-primary">
                  {number}
                </span>
                <div>
                  <p className="text-sm font-medium">{heading}</p>
                  <p className="mt-0.5 text-xs text-text-mid">{copy}</p>
                </div>
              </div>
            ))}
          </aside>
        </div>
      </section>
    </Layout>
  );
}

export default CreateComplaint;
