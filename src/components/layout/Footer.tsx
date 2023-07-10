const Footer = () => {
  return (
    <footer className="bg-dark-600 py-7 ">
      <div className="container  flex justify-between items-center">
        <div className="text-light-700 flex gap-2 font-bold lg:text-2xl items-center">
          <svg
            width="20"
            height="19"
            viewBox="0 0 20 19"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M9.76343 0.667969L19.2897 5.16797V14.168L9.76343 18.668L0.237148 14.168V5.16797L9.76343 0.667969Z"
              fill="#4D585E"
            />
          </svg>
          <span>food explorer</span>
        </div>
        <span className="text-light-200 text-xm lg:text-sm ">
          © 2023 - Todos os direitos reservados.
        </span>
      </div>
    </footer>
  );
}

export default Footer;