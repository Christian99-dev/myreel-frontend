import { GetEditResponse } from "@/types/EditService"

export default function EditEditor({selectedEditId} : {selectedEditId: number }) {

    

    return <div className="w-full h-full">Active edit : {selectedEditId}</div>
}