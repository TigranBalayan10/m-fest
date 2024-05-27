
import InboxList from "@/components/Inbox/InboxList";


const Inbox = () => {


    return (
        <div className="w-full max-w-3xl mx-auto">
            <div className="bg-white rounded-lg shadow-md dark:bg-gray-950">
                <div className="px-6 py-4 border-b border-gray-200">
                    <h2 className="text-lg font-semibold">Inbox</h2>
                </div>
                <div className="divide-y divide-gray-200">
                    <div className="group">
                        <InboxList />
                    </div>
                </div>
            </div>
        </div >
    );
};

export default Inbox;
