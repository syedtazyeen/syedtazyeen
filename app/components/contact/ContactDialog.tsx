import { useState, useEffect, useRef } from "react";
import { useFetcher } from "react-router";
import { MessageCircle, X, CheckCircle } from "lucide-react";
import { Button } from "../ui/button";

export default function ContactDialog() {
  const [isOpen, setIsOpen] = useState(false);
  const [formValues, setFormValues] = useState({
    name: "",
    email: "",
    message: "",
  });
  const [showSuccess, setShowSuccess] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");

  const fetcher = useFetcher();
  const formRef = useRef<HTMLFormElement>(null);

  useEffect(() => {
    if (fetcher.state === "idle") {
      if (fetcher.data?.success) {
        setShowSuccess(true);
        setFormValues({ name: "", email: "", message: "" });
        formRef.current?.reset();
        setErrorMessage("");

        // Auto-close after 2 seconds
        setTimeout(() => {
          setIsOpen(false);
          setShowSuccess(false);
        }, 2000);
      } else if (fetcher.data?.error) {
        setErrorMessage(fetcher.data.error);
      }
    }
  }, [fetcher.state, fetcher.data]);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormValues((prev) => ({ ...prev, [name]: value }));
  };

  return (
    <>
      <button
        onClick={() => setIsOpen(true)}
        className="group relative overflow-hidden rounded-full py-1 px-2 flex items-center gap-2 text-sm text-muted-foreground/80 font-light hover:text-background transition duration-500"
      >
        <span className="absolute left-0 top-0 h-full w-0 bg-foreground transition-all duration-300 group-hover:w-full"></span>
        <span className="relative z-10 flex items-center gap-2 font-light">
          Drop a message <MessageCircle className="size-5 stroke-[1.25]" />
        </span>
      </button>

      {isOpen && (
        <div
          className="p-4 fixed inset-0 z-[999] flex items-center justify-center bg-black/50 backdrop-blur-xs"
          onClick={() => setIsOpen(false)}
        >
          <div
            className="bg-popover min-h-100 rounded-2xl shadow-xl w-full max-w-md p-6 relative animate-fade-in"
            onClick={(e) => e.stopPropagation()}
            style={{ animation: "fadeInScale 0.2s ease-out" }}
          >
            <button
              onClick={() => setIsOpen(false)}
              className="absolute top-4 right-4 text-muted-foreground/60 hover:text-foreground transition duration-300"
            >
              <X className="size-5" />
            </button>

            {showSuccess ? (
              <div className="flex flex-col items-center gap-2 text-center mt-8">
                <CheckCircle className="size-8 stroke-1 text-green-500 animate-bounce" />
                <h3 className="text-lg font-medium">Message sent!</h3>
              </div>
            ) : (
              <>
                <span className="flex items-center gap-2 mb-4">
                  Drop a message <MessageCircle className="size-5 stroke-[1.25]" />
                </span>

                <fetcher.Form method="post" ref={formRef} className="space-y-4">
                  <input type="hidden" name="intent" value="message" />
                  <div>
                    <input
                      type="text"
                      name="name"
                      required
                      value={formValues.name}
                      onChange={handleChange}
                      className="w-full border border-border focus:border-muted/60 rounded-lg px-3 py-2 outline-none transition"
                      placeholder="Your name"
                    />
                  </div>
                  <div>
                    <input
                      type="email"
                      name="email"
                      required
                      value={formValues.email}
                      onChange={handleChange}
                      className="w-full border border-border focus:border-muted/60 rounded-lg px-3 py-2 outline-none transition"
                      placeholder="Your email"
                    />
                  </div>
                  <div>
                    <textarea
                      name="message"
                      required
                      value={formValues.message}
                      onChange={handleChange}
                      className="w-full border border-border focus:border-muted/60 rounded-lg px-3 py-2 resize-none outline-none transition"
                      rows={4}
                      placeholder="Write a message"
                    />
                  </div>
                  {errorMessage && (
                    <p className="text-sm text-red-500">{errorMessage}</p>
                  )}
                  <Button
                    type="submit"
                    disabled={fetcher.state !== "idle"}
                    className="min-w-32"
                  >
                    {fetcher.state === "submitting" ? "Sending..." : "Send"}
                  </Button>
                </fetcher.Form>
              </>
            )}
          </div>
        </div>
      )}
    </>
  );
}
