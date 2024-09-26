"use client";
import React, { useRef, useState } from "react";
import Modal, { ModalHandle, Slide } from "../shared/Modal";
import Button from "../shared/Button";
import Input from "../shared/Input";

const DebugModal = () => {
  const [modal1, setModal1] = useState(false);
  return (
    <div>
      <Button text="Modal 1" onClick={() => setModal1(true)} />

      <TestModal onClose={() => setModal1(false)} open={modal1} />
    </div>
  );
};

const TestModal = ({
  open,
  onClose,
}: {
  open: boolean;
  onClose: () => void;
}) => {
  const modalRef = useRef<ModalHandle>(null);

  return (
    <Modal title="Login" ref={modalRef} open={open} onClose={onClose}>
      <Slide>
        <Input
          placeholder="was ght"
          label="was geht"
          onChange={() => {}}
          value="test"
        />
        <Button text="Enter" onClick={() => modalRef.current?.slideTo(1)}/>
      </Slide>
      <Slide>Slide 2</Slide>
      <Slide>Slide 3</Slide>
    </Modal>
  );
};

export default DebugModal;
