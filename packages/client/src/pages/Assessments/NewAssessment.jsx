import React from 'react';
import { Button, Form } from 'react-bootstrap';
import { useForm } from 'react-hook-form';
import { AssessmentService } from '../../services/AssessmentService';

export const NewAssessment = () => {
  // create a form that utilizes the "onSubmit" function to send data to
  // packages/client/src/services/AssessmentService.js and then onto the packages/api/src/routes/assessment express API

  const {
    formState: { errors },
    handleSubmit,
    register,
    watch,
  } = useForm();

  const onSubmit = async (data) => {
    console.log(data);
    await AssessmentService.submit(data);
  };

  return <Form onSubmit={handleSubmit(onSubmit)}>
    <h1>Cat Behavioral Instrument</h1>
    <h1>Cat Details</h1>

    <div>
      <label> Cat Name </label>
      <input type="text" placeholder="Cat name" name="catName" {...register(`catName`)} />
    </div>
    <div>
      <label> Cat Date of Birth </label>
      <input type="date" name="catDob" {...register(`catDob`)} />
    </div>

    <h1>Questions and Responses</h1>

    <div>
      <label> Previous contact with the Cat Judicial System </label>
      <select {...register(`catContact`)}>
        <option value="Yes">Yes</option>
        <option value="No">No</option>
      </select>
    </div>

    <div>
      <label> Physical Alterations with other cats </label>
      <select {...register(`catAltercation`)}>
        <option value="overThree">3+</option>
        <option value="underThree">0-3</option>
      </select>
    </div>

    <div>
      <label> Physical altercations with owner (scratching, biting, and etc..) </label>
      <select {...register(`catOwner`)}>
        <option value="overTen">10+</option>
        <option value="underTen">0-10</option>
      </select>
    </div>

    <div>
      <label> Plays well with dogs </label>
      <select {...register(`catDogs`)}>
        <option value="Yes">Yes</option>
        <option value="No">No</option>
      </select>
    </div>

    <div>
      <label> Hisses at strangers </label>
      <select {...register(`catStrangers`)}>
        <option value="Yes">Yes</option>
        <option value="No">No</option>
      </select>
    </div>
    <Button variant="primary" type="submit">Submit</Button>
  </Form>;
};
