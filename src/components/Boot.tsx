import { useEffect, useState } from "react";
import { BOOT_LOG } from "../lib/content";

interface Props {
  onDone: () => void;
}

export default function Boot({ onDone }: Props) {
  const [visible, setVisible] = useState<number>(0);

  useEffect(() => {
    if (visible >= BOOT_LOG.length) {
      const t = setTimeout(onDone, 650);
      return () => clearTimeout(t);
    }
    const delay = visible === 0 ? 250 : 160 + Math.random() * 180;
    const t = setTimeout(() => setVisible((v) => v + 1), delay);
    return () => clearTimeout(t);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [visible]);

  return (
    <div className="boot-screen" onClick={onDone} role="button" tabIndex={0}>
      <div>
        {BOOT_LOG.slice(0, visible).map((line, i) => (
          <div className="boot-line" key={i}>
            {line}
          </div>
        ))}
        {visible < BOOT_LOG.length && <span className="boot-line blink">▮</span>}
      </div>
      <div className="boot-skip">click anywhere to skip</div>
    </div>
  );
}
