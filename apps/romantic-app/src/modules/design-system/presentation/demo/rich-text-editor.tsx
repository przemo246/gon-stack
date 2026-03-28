import { useState } from 'react';

import { RichTextEditor } from '../../../../libs/ui/rich-text-editor';
import { Button } from '../../../../libs/ui/button';

import { Example } from './example';

export const RichTextEditorDemo = () => {
  const [content, setContent] = useState('');

  return (
    <Example
      id="rich-text-editor-examples"
      title="Rich Text Editor"
      description="A WYSIWYG editor that lets users format and compose rich content with text styling options."
    >
      <Example.Case
        id="rich-text-editor-basic"
        title="1) Basic"
        description="A simple rich-text editor container rendered as a flex column div."
      >
        <RichTextEditor className="border border-pink-200 rounded-lg p-4 min-h-[120px] bg-white">
          <p className="b2 text-gray-500">Write your love letter here…</p>
        </RichTextEditor>
      </Example.Case>

      <Example.Case
        id="rich-text-editor-primary"
        title="2) Primary Variant"
        description="Using the primary variant for prominent editor areas."
      >
        <RichTextEditor
          variant="primary"
          className="border-2 border-pink-400 rounded-xl p-5 min-h-[140px] bg-rose-50"
        >
          <p className="b1 text-rose-700">
            My dearest, every moment with you feels like a dream…
          </p>
        </RichTextEditor>
      </Example.Case>

      <Example.Case
        id="rich-text-editor-secondary"
        title="3) Secondary Variant"
        description="Using the secondary variant for a softer editorial tone."
      >
        <RichTextEditor
          variant="secondary"
          className="border border-purple-200 rounded-lg p-4 min-h-[120px] bg-purple-50"
        >
          <p className="b2 text-purple-600 italic">
            A quiet Sunday, your laughter echoing through the morning…
          </p>
        </RichTextEditor>
      </Example.Case>

      <Example.Case
        id="rich-text-editor-toolbar"
        title="4) With Toolbar"
        description="Composing a toolbar inside the editor container."
      >
        <RichTextEditor className="border border-gray-200 rounded-xl overflow-hidden">
          <div className="flex gap-2 border-b border-gray-200 px-3 py-2 bg-gray-50">
            <button className="b3 px-2 py-1 rounded hover:bg-gray-200 font-bold">
              B
            </button>
            <button className="b3 px-2 py-1 rounded hover:bg-gray-200 italic">
              I
            </button>
            <button className="b3 px-2 py-1 rounded hover:bg-gray-200 underline">
              U
            </button>
          </div>
          <div className="p-4 min-h-[120px]">
            <p className="b2 text-gray-600">
              Compose your anniversary message with full formatting support.
            </p>
          </div>
        </RichTextEditor>
      </Example.Case>

      <Example.Case
        id="rich-text-editor-submit"
        title="5) With Submit Action"
        description="Editor paired with a submit button for sending a message."
      >
        <RichTextEditor className="border border-pink-200 rounded-xl overflow-hidden">
          <div className="p-4 min-h-[100px]">
            <p className="b2 text-gray-500">
              {content || 'Tell your partner something special today…'}
            </p>
          </div>
          <div className="flex justify-between items-center px-4 py-3 border-t border-pink-100 bg-pink-50">
            <span className="b3 text-pink-400">{content.length} / 500</span>
            <Button
              variant="primary"
              onClick={() => setContent('You make every day brighter. ❤️')}
            >
              Send message
            </Button>
          </div>
        </RichTextEditor>
      </Example.Case>

      <Example.Case
        id="rich-text-editor-readonly"
        title="6) Read-Only Display"
        description="Using the editor container to display formatted read-only content."
      >
        <RichTextEditor className="border border-gray-100 rounded-xl p-5 bg-white gap-3">
          <h4 className="t4 text-rose-600">Our Story</h4>
          <p className="b2 text-gray-700">
            It started with a single glance across a crowded room. You smiled,
            and somehow I knew — this was the beginning of something
            extraordinary.
          </p>
          <p className="b3 text-gray-400 mt-2">
            Written on Valentine&apos;s Day
          </p>
        </RichTextEditor>
      </Example.Case>
    </Example>
  );
};
