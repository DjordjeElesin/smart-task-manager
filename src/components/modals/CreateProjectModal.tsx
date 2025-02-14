import { Briefcase } from "@phosphor-icons/react";
import Input from "../ui/Input";
import Button from "../ui/Button";
import Members from "../ui/Members";
import { useState } from "react";
import useFirebase from "../../hooks/useFirebase";
import { collection, doc, setDoc, Timestamp } from "firebase/firestore";
import { Project } from "../../lib/types/Types";
import randomGradient from "random-gradient";
import { toast } from "react-toastify";
import Spinner from "../ui/Spinner";
import { useNavigate } from "react-router-dom";

type ProjectErrorsType = {
  title?: boolean;
};

export default function CreateProjectModal({
  toggleModal,
}: {
  toggleModal: (event: any) => void;
}) {
  const { auth, firestoredb } = useFirebase();
  const initalFormData: Project = {
    projectId: "",
    createdAt: Timestamp.now(),
    lastModified: Timestamp.now(),
    gradient: randomGradient(Math.random().toString()),
    createdBy: auth.currentUser?.uid || "",
    title: "",
    description: "",
    members: { ...(auth.currentUser ? { [auth.currentUser.uid]: true } : {}) },
  };
  const [formData, setFormData] = useState(initalFormData);
  const [loading, setLoading] = useState(false);
  const [titleError, setTitleError] = useState(false);

  const onMembersChange = (userId: string) => {
    if (formData.members.hasOwnProperty(userId)) {
      setFormData((prev) => {
        const updatedMembers = { ...prev.members };
        delete updatedMembers[userId];
        return {
          ...prev,
          members: updatedMembers,
        };
      });
      return;
    }
    setFormData((prev) => ({
      ...prev,
      members: { ...prev.members, [userId]: true },
    }));
  };

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    if (name === "title") {
      setTitleError(false);
    }
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSave = async () => {
    if (!formData.title) {
      setTitleError(true);
      return;
    }

    setLoading(true);
    try {
      const projectRef = collection(firestoredb, "projects");
      const newDocRef = doc(projectRef);

      await setDoc(newDocRef, { ...formData, projectId: newDocRef.id });
      toast.success(`Project '${formData.title}' successfully created!`)
      toggleModal(null)
    } catch (error) {
      console.error(error);
      toast.error("Unexpected error occurred. Please try again...");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="w-full text-neutral-500 flex flex-col gap-6 items-center">
      <div className="flex gap-2 items-center pb-4">
        <span className="p-2 rounded-full bg-primary-200 text-primary-600">
          <Briefcase size={30} />
        </span>
        <h1 className="text-xl font-bold text-neutral-700">
          Create a new project
        </h1>
      </div>
      <div className="flex flex-col gap-1">
        <label className="text-sm">Title</label>
        <Input
          name="title"
          value={formData.title}
          onChange={handleInputChange}
          placeholder="Enter the project title"
          className="drop-shadow-none w-[300px]"
          isInvalid={titleError}
        />
      </div>
      <div className="flex flex-col w-full items-start gap-1">
        <label>Members</label>
        <Members
          onMembersChange={onMembersChange}
          members={Object.keys(formData.members)}
          sizePx={30}
        />
      </div>

      <div className="flex flex-col gap-1 w-full">
        <label className="text-sm">Description</label>
        <textarea
          name="description"
          value={formData.description}
          onChange={handleInputChange}
          placeholder="Enter the project description"
          className="rounded-3xl border-2 border-neutral-200 bg-primary-50 h-[150px] w-full outline-none p-4 text-neutral-800 placeholder:text-neutral-300 focus:ring-2 focus:ring-neutral-600/20"
        />
      </div>
      <div className="flex gap-4">
        <Button variant="secondary" onClick={() => toggleModal(null)}>
          Cancel
        </Button>
        <Button onClick={handleSave}>
          {loading ? <Spinner size="30px" /> : "Save"}
        </Button>
      </div>
    </div>
  );
}
