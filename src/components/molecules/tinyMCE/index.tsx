'use client';

import dynamic from 'next/dynamic';

const Editor = dynamic(() => import('@tinymce/tinymce-react').then(m => m.Editor), {
  ssr: false,
});

export default function MyEditor() {
  return (
    <Editor
      apiKey="4m6tkiusclhh3zxgknr72oy49wj2l4jvbi2ue29ytrmh2an1"
      initialValue="<p>Tulis sesuatu di sini...</p>"
      init={{
        height: 400,
        menubar: false,
        plugins:
          'advlist autolink lists link image charmap preview anchor ' +
          'searchreplace visualblocks code fullscreen ' +
          'insertdatetime media table code help wordcount',
        toolbar:
          'undo redo | formatselect | bold italic backcolor | ' +
          'alignleft aligncenter alignright alignjustify | ' +
          'bullist numlist outdent indent | removeformat | help',
      }}
    />
  );
}
