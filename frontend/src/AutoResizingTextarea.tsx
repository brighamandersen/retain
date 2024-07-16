import React, { useEffect, useRef } from 'react';

interface AutoResizingTextareaProps
  extends React.TextareaHTMLAttributes<HTMLTextAreaElement> {}

const AutoResizingTextarea = (props: AutoResizingTextareaProps) => {
  const { value, onChange, style, ...rest } = props;

  const textareaRef = useRef<HTMLTextAreaElement | null>(null);

  useEffect(() => {
    const handleResize = () => {
      if (textareaRef.current) {
        textareaRef.current.style.height = 'auto';
        textareaRef.current.style.height = `${textareaRef.current.scrollHeight}px`;
      }
    };

    handleResize();
    window.addEventListener('resize', handleResize);

    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, [value]);

  return (
    <textarea
      ref={textareaRef}
      value={value}
      onChange={onChange}
      style={{
        resize: 'none',
        overflowY: 'auto',
        maxHeight: '80vh',
        ...style
      }}
      {...rest}
    />
  );
};

export default AutoResizingTextarea;
