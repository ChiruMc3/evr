import { FiCamera } from 'react-icons/fi';

export default function Loader() {
  return (
    <div className="flex min-h-[60vh] flex-col items-center justify-center gap-4">
      <FiCamera className="text-4xl text-golden animate-pulse" />
      <div className="h-10 w-10 animate-spin rounded-full border-2 border-golden/20 border-t-golden" />
    </div>
  );
}
