import Link from 'next/link';

export default function IconButton({linkPage, iconLabel, iconType, customPadding}) {
    const divClass = `rounded-full border-4 border-teal-400 w-28 h-28 pt-5 bg-green-100 transition hover:brightness-[0.95] duration-300 ${customPadding}`
    const iconClass = `fa-4x fa-solid text-teal-400 ${iconType}`
    return (
    <Link href={linkPage} className="flex flex-col items-center mx-2 sm:mx-5">
        <div className={divClass}>
            <i className={iconClass}></i>
        </div>
        <h1 className="mt-2 text-sm sm:text-lg font-bold text-center">{iconLabel}</h1>
    </Link>
    );
  }