import { useRef } from 'react';

type DeleteButtonProps = {
    callback: () => any;
};

export function DeleteButton({ callback }: DeleteButtonProps) {
    const modalRef = useRef<HTMLDialogElement>(null);

    function openConfirmModal(): void {
        if (!modalRef.current) return;

        modalRef.current.showModal();
    }

    function closeConfirmModal(): void {
        if (!modalRef.current) return;

        modalRef.current.close();
    }

    return (
        <>
            <button
                className="self-center place-content-center hover:text-zinc-500"
                //onClick={(): void => setIsConfirmCheck(true)}

                onClick={openConfirmModal}
            >
                Delete
            </button>

            <dialog
                ref={modalRef}
                className="p-12 rounded-lg shadow-md backdrop:backdrop-blur-sm backdrop:backdrop-brightness-75 bg-zinc-100"
            >
                <div className="flex flex-col items-center justify-center h-full gap-12 text-xl font-bold">
                    <button className="transition hover:text-zinc-500" onClick={callback}>
                        Confirm delete
                    </button>
                    <button className="transition hover:text-zinc-500" onClick={closeConfirmModal}>
                        Cancel
                    </button>
                </div>
            </dialog>
        </>
    );
}
