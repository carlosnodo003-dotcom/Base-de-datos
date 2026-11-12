import React, { useState } from 'react';
import { 
  Code2, 
  Eye, 
  Image as ImageIcon, 
  Copy, 
  Check, 
  Sparkles, 
  RefreshCw, 
  ExternalLink,
  Info
} from 'lucide-react';
import { CustomScreenData, ExtractedImage } from '../types';
import { extractImagesFromHtml, PRESET_HTML_SCREENS } from '../data/mockData';

interface CustomHtmlScreenProps {
  customScreen: CustomScreenData;
  onUpdateScreen: (screen: CustomScreenData) => void;
  onOpenImporter: () => void;
}

export const CustomHtmlScreen: React.FC<CustomHtmlScreenProps> = ({
  customScreen,
  onUpdateScreen,
  onOpenImporter,
}) => {
  const [activeTab, setActiveTab] = useState<'preview' | 'images' | 'editor'>('preview');
  const [editableHtml, setEditableHtml] = useState(customScreen.rawHtml);
  const [copiedUrl, setCopiedUrl] = useState<string | null>(null);
  const [appliedNotice, setAppliedNotice] = useState(false);

  const images = customScreen.extractedImages || extractImagesFromHtml(customScreen.rawHtml);

  const handleApplyChanges = () => {
    const updatedImages = extractImagesFromHtml(editableHtml);
    onUpdateScreen({
      ...customScreen,
      rawHtml: editableHtml,
      extractedImages: updatedImages,
    });
    setAppliedNotice(true);
    setTimeout(() => setAppliedNotice(false), 2000);
  };

  const handleLoadPreset = (preset: CustomScreenData) => {
    setEditableHtml(preset.rawHtml);
    onUpdateScreen(preset);
  };

  const handleCopy = (url: string) => {
    navigator.clipboard.writeText(url);
    setCopiedUrl(url);
    setTimeout(() => setCopiedUrl(null), 1500);
  };

  return (
    <div className="bg-neutral-900 min-h-full text-neutral-100 font-sans flex flex-col">
      {/* Top Inspector Bar */}
      <div className="sticky top-0 z-30 px-4 py-2.5 bg-neutral-950/90 backdrop-blur-md border-b border-neutral-800 flex items-center justify-between gap-2">
        <div className="flex items-center gap-1.5 p-1 bg-neutral-900 rounded-lg border border-neutral-800 text-xs">
          <button
            onClick={() => setActiveTab('preview')}
            className={`flex items-center gap-1 px-2.5 py-1 rounded-md font-semibold transition ${
              activeTab === 'preview'
                ? 'bg-indigo-600 text-white shadow-sm'
                : 'text-neutral-400 hover:text-white'
            }`}
          >
            <Eye className="w-3.5 h-3.5" />
            <span>Screen</span>
          </button>

          <button
            onClick={() => setActiveTab('images')}
            className={`flex items-center gap-1 px-2.5 py-1 rounded-md font-semibold transition ${
              activeTab === 'images'
                ? 'bg-indigo-600 text-white shadow-sm'
                : 'text-neutral-400 hover:text-white'
            }`}
          >
            <ImageIcon className="w-3.5 h-3.5" />
            <span>Images ({images.length})</span>
          </button>

          <button
            onClick={() => setActiveTab('editor')}
            className={`flex items-center gap-1 px-2.5 py-1 rounded-md font-semibold transition ${
              activeTab === 'editor'
                ? 'bg-indigo-600 text-white shadow-sm'
                : 'text-neutral-400 hover:text-white'
            }`}
          >
            <Code2 className="w-3.5 h-3.5" />
            <span>HTML Code</span>
          </button>
        </div>

        {/* Preset Selector Dropdown */}
        <div className="flex items-center gap-2">
          <select
            onChange={(e) => {
              const selected = PRESET_HTML_SCREENS.find((p) => p.id === e.target.value);
              if (selected) handleLoadPreset(selected);
            }}
            value={customScreen.id}
            className="text-xs bg-neutral-900 border border-neutral-750 text-neutral-200 px-2 py-1 rounded-lg focus:outline-none focus:ring-1 focus:ring-indigo-500"
          >
            {PRESET_HTML_SCREENS.map((preset) => (
              <option key={preset.id} value={preset.id}>
                {preset.title}
              </option>
            ))}
          </select>
        </div>
      </div>

      {/* Main View Area */}
      <div className="flex-1 flex flex-col">
        {/* TAB 1: RENDERED SCREEN */}
        {activeTab === 'preview' && (
          <div className="flex-1 relative">
            <div
              className="w-full h-full"
              dangerouslySetInnerHTML={{ __html: customScreen.rawHtml }}
            />
          </div>
        )}

        {/* TAB 2: HOTLINKED IMAGES CATALOG */}
        {activeTab === 'images' && (
          <div className="p-4 space-y-4 max-w-lg mx-auto w-full">
            <div className="p-3 rounded-xl bg-neutral-950 border border-neutral-800 text-xs">
              <div className="flex items-center gap-2 font-bold text-amber-400 mb-1">
                <Sparkles className="w-3.5 h-3.5" />
                <span>Hotlinked Image Catalog ({images.length} URLs detected)</span>
              </div>
              <p className="text-[11px] text-neutral-400">
                These images were automatically parsed from &lt;img src=&quot;...&quot;&gt; tags in your HTML markup.
              </p>
            </div>

            <div className="space-y-3">
              {images.map((img, i) => (
                <div
                  key={i}
                  className="p-3 rounded-xl bg-neutral-950 border border-neutral-800 flex gap-3 items-center"
                >
                  <div className="w-16 h-16 rounded-lg bg-neutral-900 overflow-hidden flex-shrink-0 border border-neutral-800">
                    <img
                      src={img.src}
                      alt={img.alt}
                      className="w-full h-full object-cover"
                      onError={(e) => {
                        (e.target as HTMLElement).style.display = 'none';
                      }}
                    />
                  </div>

                  <div className="flex-1 min-w-0">
                    <div className="text-xs font-bold text-white truncate">{img.alt}</div>
                    <div className="text-[10px] font-mono text-neutral-400 truncate mt-0.5">
                      {img.src}
                    </div>
                    <div className="flex items-center gap-2 mt-2">
                      <button
                        onClick={() => handleCopy(img.src)}
                        className="px-2 py-1 rounded bg-neutral-800 hover:bg-neutral-700 text-neutral-200 text-[10px] font-semibold flex items-center gap-1 transition"
                      >
                        {copiedUrl === img.src ? (
                          <>
                            <Check className="w-3 h-3 text-emerald-400" />
                            <span>Copied</span>
                          </>
                        ) : (
                          <>
                            <Copy className="w-3 h-3" />
                            <span>Copy URL</span>
                          </>
                        )}
                      </button>

                      <a
                        href={img.src}
                        target="_blank"
                        rel="noreferrer"
                        className="px-2 py-1 rounded bg-neutral-800 hover:bg-neutral-700 text-neutral-300 text-[10px] flex items-center gap-1"
                      >
                        <ExternalLink className="w-3 h-3" />
                        <span>Open</span>
                      </a>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* TAB 3: HTML CODE STUDIO */}
        {activeTab === 'editor' && (
          <div className="p-4 flex-1 flex flex-col space-y-3">
            <div className="flex items-center justify-between">
              <span className="text-xs font-bold text-neutral-300">Live Screen HTML Code:</span>
              <button
                onClick={handleApplyChanges}
                className="px-3 py-1.5 rounded-lg bg-indigo-600 hover:bg-indigo-500 text-white font-bold text-xs flex items-center gap-1.5 transition"
              >
                {appliedNotice ? (
                  <>
                    <Check className="w-3.5 h-3.5" />
                    <span>Applied!</span>
                  </>
                ) : (
                  <>
                    <RefreshCw className="w-3.5 h-3.5" />
                    <span>Apply HTML</span>
                  </>
                )}
              </button>
            </div>

            <textarea
              value={editableHtml}
              onChange={(e) => setEditableHtml(e.target.value)}
              placeholder="Paste HTML here..."
              className="w-full flex-1 min-h-[350px] p-3 rounded-xl bg-neutral-950 border border-neutral-800 font-mono text-xs text-emerald-400 focus:outline-none focus:ring-1 focus:ring-indigo-500 leading-relaxed resize-none"
            />
          </div>
        )}
      </div>
    </div>
  );
};
