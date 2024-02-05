import { useState } from "react";
import * as Yup from "yup";
import { useFormik } from "formik";
import {
    BtnPlus,
    BtnSubmit,
    LabelAvatar,
    StyledForm,
    UpdateAvatar,
    WrapperUpdateAvatar,
    BtnWrapper,
    InputForm,
    Label,
    InputNthChild,
    ErrorMessage,
} from "./EditProfileForm.styled";

let EMAIL_REGX = `^(([^<>()\\[\\]\\.,;:\\s@"]+(.[^<>()\\[\\]\\.,;:\\s@"]+)*)|(".+"))@(([[0-9]{1,3}.[0-9]{1,3}.[0-9]{1,3}.[0-9]{1,3}])|(([a-zA-Z-0-9]+.)+[a-zA-Z]{2,}))$/`;

const editProfileSchema = Yup.object().shape({
    avatar: Yup.string(),
    name: Yup.string().min(3, "Too Short!").max(50, "Too Long!"),
    email: Yup.string().matches(EMAIL_REGX, "Invalid email address"),
    password: Yup.string()
        .min(8, "Must Contain 8 Characters")
        .matches(/^(?=.*[a-z])/, " Must Contain One Lowercase Character")
        .matches(/^(?=.*[A-Z])/, "  Must Contain One Uppercase Character")
        .matches(/^(?=.*[0-9])/, "  Must Contain One Number Character")
        .matches(
            /^(?=.*[!@#\$%\^&\*])/,
            "Must Contain One Special Case Character"
        ),
});

export default function ProfileForm() {
    const [avatarPreview, setAvatarPreview] = useState(
        "images/VectorExample.png"
    );

    const formik = useFormik({
        initialValues: {
            avatar: "images/VectorExample.png",
            name: "",
            email: "",
            password: "",
        },
        validationSchema: editProfileSchema,
        onSubmit: (values) => {
            console.log(values);
        },
    });

    const handleChange = (e) => {
        const { name, type, files } = e.target;
        const value = type === "file" ? files[0] : e.target.value;

        formik.handleChange(e);
        formik.setFieldValue(name, value);

        if (type === "file") {
            const fileReader = new FileReader();
            fileReader.onload = () => {
                if (fileReader.readyState === 2) {
                    setAvatarPreview(fileReader.result);
                }
            };
            if (files[0]) {
                fileReader.readAsDataURL(files[0]);
            }
        }
    };

    return (
        <StyledForm onSubmit={formik.handleSubmit}>
            <WrapperUpdateAvatar>
                <UpdateAvatar src={avatarPreview} />
            </WrapperUpdateAvatar>
            <div>
                <LabelAvatar htmlFor="button-file">
                    <BtnWrapper>
                        <BtnPlus />
                    </BtnWrapper>
                    <input
                        name="avatar"
                        accept="image/*"
                        id="button-file"
                        type="file"
                        hidden
                        onChange={handleChange}
                    />
                </LabelAvatar>
            </div>

            <Label>
                {formik.touched.name && formik.errors.name && (
                    <ErrorMessage className="error-message">
                        {formik.errors.name}
                    </ErrorMessage>
                )}
                <InputForm
                    type="text"
                    name="name"
                    value={formik.values.name}
                    onChange={handleChange}
                />
            </Label>

            <Label>
                {formik.touched.email && formik.errors.email && (
                    <ErrorMessage className="error-message">
                        {formik.errors.email}
                    </ErrorMessage>
                )}
                <InputForm
                    type="text"
                    name="email"
                    value={formik.values.email}
                    onChange={handleChange}
                />
            </Label>
            <Label>
                {formik.touched.password && formik.errors.password && (
                    <ErrorMessage className="error-message">
                        {formik.errors.password}
                    </ErrorMessage>
                )}
                <InputNthChild
                    type="password"
                    name="password"
                    className="nth-child"
                    value={formik.values.password}
                    onChange={handleChange}
                />
            </Label>
            <BtnSubmit type="submit">Submit</BtnSubmit>
        </StyledForm>
    );
}
