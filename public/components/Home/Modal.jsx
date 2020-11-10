import { Transition } from "@headlessui/react";
import { CloseOutlined } from "@ant-design/icons";

export default function Modal(props) {
  const data = props.data[0];
  return (
    props.isOpen && (
      <div
        className={`${
          props.isOpen ? "" : " invisible"
        } fixed z-50  inset-0 overflow-y-auto `}
      >
        <div className="flex items-end justify-center min-h-screen pt-4 px-4 pb-20 text-center sm:block sm:p-0">
          <Transition
            appear={true}
            show={props.isOpen}
            enter="ease-out duration-300 "
            enterFrom="opacity-0 "
            enterTo="opacity-100 "
            leave="ease-in duration-800 "
            leaveFrom="opacity-100 "
            leaveTo="opacity-0 "
          >
            {(ref) => (
              <div
                ref={ref}
                className="fixed inset-0 transition-opacity"
                onClick={props.modalToogle}
              >
                <div className="absolute inset-0 bg-gray-500 opacity-75">
                  <button
                    className="absolute right-10 top-10 p-3 rounded-full bg-white shadow-3xl inline-flex items-center focus:outline-none ml-auto"
                    onClick={props.modalToogle}
                  >
                    <CloseOutlined />
                  </button>
                </div>
              </div>
            )}
          </Transition>
          <span className="hidden sm:inline-block sm:align-middle sm:h-screen"></span>
          &#8203;
          <Transition
            show={props.isOpen}
            enter="ease-out duration-300"
            enterFrom="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
            enterTo="opacity-100 translate-y-0 sm:scale-100"
            leave="ease-in duration-200"
            leaveFrom="opacity-100 translate-y-0 sm:scale-100"
            leaveTo="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
          >
            {(ref) => (
              <div
                ref={ref}
                className="inline-block align-bottom self-center bg-white rounded-lg text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-xl sm:w-full"
                role="dialog"
                aria-modal="true"
                aria-labelledby="modal-headline"
              >
                <div className="bg-white px-4 pt-5 pb-4 sm:p-6 sm:pb-4">
                  <div className="sm:flex sm:items-start">
                    <div className="mt-3 text-center sm:mt-0 sm:ml-4 sm:text-left">
                      <h3
                        className="text-2xl leading-6 font-medium text-gray-900 uppercase"
                        id="modal-headline"
                      >
                        {data.title}
                      </h3>
                      <div className="mt-5">
                        <p className="text-base hitespace-pre-line text-gray-500 uppercase tracking-wider leading-relaxed">
                          {data.content}
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="bg-gray-50 px-4 py-3 sm:px-6 sm:flex sm:flex-row-reverse">
                  <span className="mt-3 flex w-full rounded-md shadow-sm sm:mt-0 sm:w-auto">
                    <button
                      onClick={props.modalToogle}
                      type="button"
                      className="inline-flex justify-center w-full rounded-md border border-gray-300 px-4 py-2 bg-white text-base leading-6 font-medium text-gray-700 shadow-sm hover:text-gray-500 focus:outline-none focus:border-blue-300 focus:shadow-outline-blue transition ease-in-out duration-150 sm:text-sm sm:leading-5"
                    >
                      Close
                    </button>
                  </span>
                </div>
              </div>
            )}
          </Transition>
        </div>
      </div>
    )
  );
}
