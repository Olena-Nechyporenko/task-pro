import * as Yup from "yup";
import { useState } from "react";
import PropTypes from "prop-types";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { Formik, Form, ErrorMessage } from "formik";
import { useDispatch, useSelector } from "react-redux";
import { editCard } from "../../redux/cards/operations";
import { selectCurrentBoard } from "../../redux/boards/selectors";
import { getBoardById } from "../../redux/boards/operations";
import { CardButton } from "../CardButton/CardButton";
import CustomDatePicker from "../Calendar/Calendar";
import {
  FormWrapper,
  Error,
  Label,
  Input,
  DescriptionArea,
  FormRadioWrapper,
  TitleForRadio,
  WrappRadioButtons,
  RadioButton,
  LabelRadio,
  DeadlineWrapper,
  DeadlineTitle,
} from "./EditCardForm.styled";

const schema = Yup.object().shape({
  title: Yup.string()
    .required()
    .max(25, "must be no more than 25 characters long"),
  description: Yup.string(),
});

export const EditCardForm = ({ cardInfo, onClose }) => {
  const { _id, titleCard, description, priority, deadline } = cardInfo;
  const [labelChecked, setLabelChecked] = useState(priority);
  const [selectedDate, setSelectedDate] = useState(deadline);
  const dispatch = useDispatch();

  const handleDateChange = (date) => {
    const year = date.getFullYear().toString();
    const month = (date.getMonth() + 1).toString().padStart(2, "0");
    const day = date.getDate().toString().padStart(2, "0");
    const formattedDate = `${year}-${month}-${day}`;
    setSelectedDate(formattedDate);
  };

  const { board } = useSelector(selectCurrentBoard);

  const handleLableChange = (e) => {
    setLabelChecked(e.target.value);
  };

  const handleSubmit = async (values, { resetForm }) => {
    const newCardData = {
      titleCard: values.title,
      description: values.description,
      priority: labelChecked,
      deadline: selectedDate,
    };
    await dispatch(editCard({ _id, newCardData }));
    dispatch(getBoardById(board._id));
    toast.success("You have successfully edited the card!", {
      position: "top-right",
      autoClose: 5000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: false,
      draggable: false,
      progress: undefined,
      theme: "light",
    });
    resetForm();
    onClose();
  };

  return (
    <Formik
      initialValues={{ title: titleCard, description: description }}
      validationSchema={schema}
      onSubmit={handleSubmit}
    >
      <Form autoComplete="off">
        <FormWrapper>
          <Label htmlFor="title">
            <Input
              type="text"
              name="title"
              placeholder="Title"
              autoFocus
              required
            />
            <Error>
              <ErrorMessage name="title" />
            </Error>
          </Label>
          <Label htmlFor="description">
            <DescriptionArea
              component="textarea"
              name="description"
              rows="5"
              cols="33"
              placeholder="Description"
            />
          </Label>
        </FormWrapper>

        <FormRadioWrapper>
          <TitleForRadio>Label color</TitleForRadio>
          <WrappRadioButtons role="group">
            <LabelRadio htmlFor="low">
              <RadioButton
                type="radio"
                name="priority"
                value="low"
                onChange={handleLableChange}
                checked={labelChecked === "low"}
              />
            </LabelRadio>
            <LabelRadio htmlFor="medium">
              <RadioButton
                type="radio"
                name="priority"
                value="medium"
                onChange={handleLableChange}
                checked={labelChecked === "medium"}
              />
            </LabelRadio>
            <LabelRadio htmlFor="high">
              <RadioButton
                type="radio"
                name="priority"
                value="high"
                onChange={handleLableChange}
                checked={labelChecked === "high"}
              />
            </LabelRadio>
            <LabelRadio htmlFor="without">
              <RadioButton
                type="radio"
                name="priority"
                value="without"
                onChange={handleLableChange}
                checked={labelChecked === "without"}
              />
            </LabelRadio>
          </WrappRadioButtons>
        </FormRadioWrapper>

        <DeadlineWrapper>
          <DeadlineTitle>Deadline</DeadlineTitle>
          <CustomDatePicker
            handleDateChange={handleDateChange}
            selectedDate={selectedDate}
          />
        </DeadlineWrapper>

        <CardButton btnText="Edit" />
      </Form>
    </Formik>
  );
};

EditCardForm.propTypes = {
  cardInfo: PropTypes.object,
  onClose: PropTypes.func,
};
