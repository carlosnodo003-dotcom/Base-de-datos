import React, { useState } from 'react';
import { 
  X, 
  Code2, 
  Sparkles, 
  Image as ImageIcon, 
  Check, 
  FileCode, 
  ArrowRight,
  Info
} from 'lucide-react';
import { CustomScreenData, ExtractedImage } from '../types';
import { extractImagesFromHtml, PRESET_HTML_SCREENS } from '../data/mockData';

interface HtmlImporterModalProps {
  isOpen: boolean;
  onClose: () => void;
  onImport: (newScreen: CustomScreenData) => void;
}

export const HtmlImporterModal: React.FC<HtmlImporterModalProps> = ({
  isOpen,
  onClose,
  onImport,
}) => {
  const [title, setTitle] = useState('Imported Custom Screen');
  const [htmlCode, setHtmlCode] = useState('');
  const [detectedImages, setDetectedImages] = useState<ExtractedImage[]>([]);

  if (!isOpen) return null;

  const handleHtmlChange = (val: string) => {
    setHtmlCode(val);
    const imgs = extractImagesFromHtml(val);
    setDetectedImages(imgs);
  };

  const handleApplyPreset = (preset: CustomScreenData) => {
    setTitle(preset.title);
    setHtmlCode(preset.rawHtml);
    setDetectedImages(preset.extractedImages);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!htmlCode.trim()) return;

    const newScreen: CustomScreenData = {
      id: 'custom-' + Date.now(),
      title: title || 'Custom Screen',
      description: `Parsed screen with ${detectedImages.length} hotlinked images`,
      rawHtml: htmlCode,
      extractedImages: detectedImages,
      themeColor: '#4f46e5',
    };

    onImport(newScreen);
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/70 backdrop-blur-sm animate-in fade-in duration-200">
      <div className="w-full max-w-2xl bg-white dark:bg-neutral-900 rounded-2xl shadow-2xl border border-neutral-200 dark:border-neutral-800 overflow-hidden flex flex-col max-h-[90vh]">
        {/* Modal Header */}
        <div className="px-5 py-4 border-b border-neutral-200 dark:border-neutral-800 flex items-center justify-between">
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-lg bg-indigo-50 dark:bg-indigo-950 text-indigo-600 dark:text-indigo-400 flex items-center justify-center">
              <Code2 className="w-4 h-4" />
            </div>
            <div>
              <h2 className="text-sm font-bold text-neutral-900 dark:text-white">
                Import HTML Screen & Hotlinked Images
              </h2>
              <p className="text-xs text-neutral-500 dark:text-neutral-400">
                Paste any HTML mockup with &lt;img src=&quot;...&quot;&gt; tags to render directly.
              </p>
            </div>
          </div>

          <button
            onClick={onClose}
            className="w-8 h-8 rounded-lg flex items-center justify-center text-neutral-400 hover:text-neutral-600 dark:hover:text-neutral-200 transition"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Modal Body */}
        <div className="p-5 overflow-y-auto space-y-4">
          {/* Quick Presets Bar */}
          <div>
            <div className="flex items-center gap-1.5 text-xs font-semibold text-neutral-700 dark:text-neutral-300 mb-2">
              <Sparkles className="w-3.5 h-3.5 text-amber-500" />
              <span>Or load a preset template:</span>
            </div>
            <div className="flex flex-wrap gap-2">
              {PRESET_HTML_SCREENS.map((preset) => (
                <button
                  key={preset.id}
                  type="button"
                  onClick={() => handleApplyPreset(preset)}
                  className="px-3 py-1.5 rounded-lg text-xs font-medium bg-neutral-100 hover:bg-neutral-200 dark:bg-neutral-800 dark:hover:bg-neutral-750 text-neutral-700 dark:text-neutral-300 border border-neutral-200/80 dark:border-neutral-700 transition"
                >
                  {preset.title}
                </button>
              ))}
            </div>
          </div>

          {/* Screen Title */}
          <div>
            <label className="text-xs font-bold text-neutral-800 dark:text-neutral-200 block mb-1">
              Screen Name
            </label>
            <input
              type="text"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              placeholder="e.g. Lookbook Summer 2026"
              className="w-full px-3 py-2 text-xs rounded-lg bg-neutral-50 dark:bg-neutral-800/80 border border-neutral-200 dark:border-neutral-700 text-neutral-900 dark:text-neutral-100 focus:outline-none focus:ring-1 focus:ring-indigo-500"
            />
          </div>

          {/* Raw HTML Code Editor */}
          <div>
            <div className="flex items-center justify-between mb-1">
              <label className="text-xs font-bold text-neutral-800 dark:text-neutral-200">
                HTML Content & Hotlinked &lt;img&gt; Tags
              </label>
              <span className="text-[11px] text-neutral-400">
                Supports Tailwind CSS & standard styling
              </span>
            </div>
            <textarea
              rows={8}
              value={htmlCode}
              onChange={(e) => handleHtmlChange(e.target.value)}
              placeholder={`<div class="p-4 bg-slate-900 text-white">\n  <h1 class="text-xl font-bold">My Screen</h1>\n  <img src="https://images.unsplash.com/..." alt="Cover" />\n</div>`}
              className="w-full p-3 font-mono text-xs rounded-xl bg-neutral-950 text-emerald-400 border border-neutral-800 focus:outline-none focus:ring-2 focus:ring-indigo-500 leading-relaxed"
            />
          </div>

          {/* Detected Hotlinked Images Gallery */}
          {detectedImages.length > 0 && (
            <div className="p-3 rounded-xl bg-neutral-50 dark:bg-neutral-850 border border-neutral-200/80 dark:border-neutral-750">
              <div className="flex items-center gap-1.5 text-xs font-bold text-neutral-800 dark:text-neutral-200 mb-2">
                <ImageIcon className="w-3.5 h-3.5 text-indigo-500" />
                <span>Detected {detectedImages.length} Hotlinked Images:</span>
              </div>
              <div className="flex gap-2 overflow-x-auto pb-1 scrollbar-none">
                {detectedImages.map((img, i) => (
                  <div
                    key={i}
                    className="w-16 h-16 rounded-lg bg-neutral-200 dark:bg-neutral-800 overflow-hidden flex-shrink-0 border border-neutral-300 dark:border-neutral-700 relative group"
                    title={img.src}
                  >
                    <img
                      src={img.src}
                      alt={img.alt}
                      className="w-full h-full object-cover"
                    />
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Notice Box */}
          <div className="p-3 rounded-xl bg-indigo-50 dark:bg-indigo-950/40 border border-indigo-200/60 dark:border-indigo-800/60 text-xs text-indigo-900 dark:text-indigo-200 flex gap-2">
            <Info className="w-4 h-4 text-indigo-500 flex-shrink-0 mt-0.5" />
            <div className="leading-relaxed text-[11px]">
              Tip: You can hotlink images from any public host (e.g. Unsplash, Cloudinary, AWS S3) directly inside <code className="px-1 py-0.5 rounded bg-indigo-100 dark:bg-indigo-900 text-indigo-800 dark:text-indigo-200">&lt;img src=&quot;https://...&quot;&gt;</code>. They will render inside the device frame instantly!
            </div>
          </div>
        </div>

        {/* Modal Footer */}
        <div className="px-5 py-3.5 border-t border-neutral-200 dark:border-neutral-800 bg-neutral-50 dark:bg-neutral-900/50 flex items-center justify-end gap-2">
          <button
            type="button"
            onClick={onClose}
            className="px-4 py-2 rounded-xl text-xs font-semibold text-neutral-600 dark:text-neutral-300 hover:bg-neutral-100 dark:hover:bg-neutral-800 transition"
          >
            Cancel
          </button>
          <button
            type="button"
            onClick={handleSubmit}
            disabled={!htmlCode.trim()}
            className="px-5 py-2 rounded-xl bg-indigo-600 hover:bg-indigo-500 disabled:opacity-40 text-white text-xs font-bold flex items-center gap-1.5 shadow-sm transition"
          >
            <Check className="w-3.5 h-3.5" />
            <span>Mount as Active Screen</span>
          </button>
        </div>
      </div>
    </div>
  );
};
