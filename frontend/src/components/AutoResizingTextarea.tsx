import React, { useEffect, useRef } from 'react';

interface AutoResizingTextareaProps
  extends React.TextareaHTMLAttributes<HTMLTextAreaElement> {}

const AutoResizingTextarea = (props: AutoResizingTextareaProps) => {
  const { className, onChange, value, ...rest } = props;

  // Create an internal ref if no ref is provided
  const textareaRef = useRef<HTMLTextAreaElement>(null);

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
  }, [textareaRef, value]);

  useEffect(() => {
    if (textareaRef.current) {
      textareaRef.current.focus();
    }
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  return (
    <textarea
      className={`auto-resizing-textarea ${className}`}
      onChange={onChange}
      ref={textareaRef}
      value={value}
      {...rest}
    />
  );
};

export default AutoResizingTextarea;
