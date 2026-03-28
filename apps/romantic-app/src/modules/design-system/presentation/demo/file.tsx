import { File } from '../../../../libs/ui/file';

import { Example } from './example';

export const FileDemo = () => {
  return (
    <Example
      id="file-examples"
      title="File"
      description="Displays a file item with name, metadata, and optional actions for managing or downloading files."
    >
      <Example.Case
        id="file-basic"
        title="1) Basic (name only)"
        description="Display a file name with the default file icon."
      >
        <File name="love-letter.pdf" />
      </Example.Case>

      <Example.Case
        id="file-with-meta"
        title="2) Name + meta"
        description="Show a secondary line with file size or type information."
      >
        <File name="anniversary-photo.jpg" meta="3.2 MB · JPEG" />
      </Example.Case>

      <Example.Case
        id="file-list"
        title="3) File list"
        description="A stacked list of files – ideal for showing multiple attachments."
      >
        <div className="space-y-2">
          <File name="valentines-day-card.pdf" meta="124 KB · PDF" />
          <File name="playlist-our-songs.m3u" meta="4 KB · M3U" />
          <File name="scrapbook-2024.zip" meta="18.7 MB · ZIP" />
          <File name="first-date-receipts.png" meta="512 KB · PNG" />
        </div>
      </Example.Case>

      <Example.Case
        id="file-custom-children"
        title="4) Custom children"
        description="Render arbitrary content inside the file row alongside the icon."
      >
        <File name="relationship-goals.docx">
          <span className="b3 opacity-60">
            Last edited by <strong>Alex</strong> · 2 hours ago
          </span>
        </File>
      </Example.Case>

      <Example.Case
        id="file-icon-only"
        title="5) Icon only"
        description="Omit name and meta to show just the file icon as a visual marker."
      >
        <div className="flex gap-3">
          <File aria-label="File attachment" />
          <File aria-label="File attachment" />
          <File aria-label="File attachment" />
        </div>
      </Example.Case>
    </Example>
  );
};
