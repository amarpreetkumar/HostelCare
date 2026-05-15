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
        <header className="animate-fade stagger-1">
          <h1 className="font-display text-3xl font-semibold">Create Complaint</h1>
          <p className="mt-2 text-sm text-text-muted">Describe your issue clearly for faster resolution</p>
        </header>

        <div className="grid gap-5 lg:grid-cols-[minmax(0,1fr)_18rem]">
          <form
            onSubmit={handleSubmit}
            className="animate-fade stagger-2 rounded-2xl border border-border-dark bg-bg-card p-7 shadow-card"
          >
            <div className="mb-5">
              <label className="mb-2 block text-[11px] font-semibold uppercase tracking-wider text-text-muted">Title</label>
              <input
                type="text"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                placeholder="e.g. Fan not working in Room 204"
                className="w-full rounded-xl border border-border-dark bg-bg-surface px-4 py-3 text-sm text-text-primary outline-none transition-all placeholder:text-text-muted focus:border-accent-blue focus:ring-1 focus:ring-accent-blue/30"
              />
            </div>

            <div className="mb-5">
              <label className="mb-2 block text-[11px] font-semibold uppercase tracking-wider text-text-muted">Description</label>
              <textarea
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                className="min-h-24 w-full rounded-xl border border-border-dark bg-bg-surface px-4 py-3 text-sm text-text-primary outline-none transition-all placeholder:text-text-muted focus:border-accent-blue focus:ring-1 focus:ring-accent-blue/30"
              />
            </div>

            <div className="mb-5">
              <label className="mb-2 block text-[11px] font-semibold uppercase tracking-wider text-text-muted">Category</label>
              <select
                value={category}
                onChange={(e) => setCategory(e.target.value)}
                className="w-full rounded-xl border border-border-dark bg-bg-surface px-4 py-3 text-sm text-text-primary outline-none transition-all focus:border-accent-blue focus:ring-1 focus:ring-accent-blue/30"
              >
                <option value="">Select category</option>
                <option>Electricity</option>
                <option>Water/Plumbing</option>
                <option>Cleaning</option>
                <option>Furniture</option>
                <option>Internet/WiFi</option>
                <option>Security</option>
                <option>Other</option>
              </select>
            </div>

            <div className="mb-5">
              <label className="mb-2 block text-[11px] font-semibold uppercase tracking-wider text-text-muted">Upload Image</label>
              <div className="flex min-h-40 w-full cursor-pointer flex-col items-center justify-center overflow-hidden rounded-xl border-2 border-dashed border-border-dark bg-bg-surface p-6 text-center transition-all hover:border-accent-blue hover:bg-accent-blue/[0.03]">
                {preview ? (
                  <div className="relative flex h-full w-full items-center justify-center">
                    <img src={preview} alt="preview" className="max-h-36 rounded-xl object-contain" />
                    <button
                      type="button"
                      onClick={() => {
                        setImage(null);
                        setPreview(null);
                      }}
                      className="absolute right-2 top-2 rounded-lg bg-accent-red px-2 py-1 text-xs text-white transition-all duration-150 active:scale-[0.97]"
                    >
                      Remove
                    </button>
                  </div>
                ) : (
                  <button
                    type="button"
                    onClick={() => document.getElementById("imageUpload").click()}
                    className="flex flex-col items-center text-text-muted transition-all duration-150 hover:text-text-primary active:scale-[0.97]"
                  >
                    <Camera className="mb-2" size={28} />
                    <span className="text-sm">Click or drag image to upload</span>
                    <span className="mt-1 text-[11px] text-text-muted/60">PNG, JPG up to 5MB</span>
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
              className="flex w-full items-center justify-center gap-2 rounded-xl bg-gradient-to-br from-accent-blue to-accent-purple py-3 text-sm font-medium text-white transition-all duration-150 hover:brightness-110 active:scale-[0.97]"
            >
              <Send size={16} />
              Submit Complaint
            </button>
          </form>

          <aside className="animate-fade stagger-3 h-fit rounded-2xl border border-border-dark bg-bg-card p-5 shadow-card lg:sticky lg:top-8">
            <h2 className="mb-4 text-sm font-semibold">How it works</h2>
            {[
              ["1", "Submit your complaint", "Share issue details and images."],
              ["2", "Admin reviews it", "The request is checked and assigned."],
              ["3", "Staff resolves it", "Maintenance handles the work."],
              ["4", "You get confirmation", "Status updates keep you informed."],
            ].map(([number, heading, copy]) => (
              <div key={number} className="mb-4 flex items-start gap-3 last:mb-0">
                <span className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-accent-blue/15 text-xs font-semibold text-accent-blue">
                  {number}
                </span>
                <div>
                  <p className="text-sm font-medium">{heading}</p>
                  <p className="mt-0.5 text-xs text-text-muted">{copy}</p>
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
