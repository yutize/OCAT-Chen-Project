import React from 'react';
import { Button, Form } from 'react-bootstrap';
import { useForm } from 'react-hook-form';
import { AssessmentService } from '../../services/AssessmentService';

export const NewAssessment = () => {
  // create a form that utilizes the "onSubmit" function to send data to
  // packages/client/src/services/AssessmentService.js and then onto the packages/api/src/routes/assessment express API
  const today = new Date().toISOString().slice(0, 10);

  const {
    formState: { errors },
    handleSubmit,
    register,
    watch,
  } = useForm();

  const onSubmit = async (data) => {
    let sum = 0;
    sum = parseInt(data.catContact) + parseInt(data.catAltercation) + parseInt(data.catOwner) +
    parseInt(data.catDogs) + parseInt(data.catStrangers);
    console.log(sum);
    data.score = sum;

    const allowedKeys = [
      `catName`,
      `catDateOfBirth`,
      `instrumentType`,
      `riskLevel`,
      `score`,
    ];

    if (sum === 0 || sum === 1) {
      data.riskLevel = `low`;
    } else if (sum === 2 || sum === 3) {
      data.riskLevel = `medium`;
    } else if (sum === 4 || sum === 5) {
      data.riskLevel = `high`;
    }
    data.instrumentType = `hello`;
    console.log(`dattaaaaaa`, data);

    const filtered = Object.fromEntries(
      Object.entries(data).filter(([ key ]) => allowedKeys.includes(key)),
    );
    await AssessmentService.submit(filtered);
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
      <input type="date" {...register(`catDateOfBirth`)} />
    </div>

    <h1>Questions and Responses</h1>

    <div>
      <label> Previous contact with the Cat Judicial System </label>
      <select {...register(`catContact`)}>
        <option value={1}>Yes</option>
        <option value={0}>No</option>
      </select>
    </div>

    <div>
      <label> Physical Alterations with other cats </label>
      <select {...register(`catAltercation`)}>
        <option value={1}>3+</option>
        <option value={0}>0-3</option>
      </select>
    </div>

    <div>
      <label> Physical altercations with owner (scratching, biting, and etc..) </label>
      <select {...register(`catOwner`)}>
        <option value={1}>10+</option>
        <option value={0}>0-10</option>
      </select>
    </div>

    <div>
      <label> Plays well with dogs </label>
      <select {...register(`catDogs`)}>
        <option value={0}>Yes</option>
        <option value={1}>No</option>
      </select>
    </div>

    <div>
      <label> Hisses at strangers </label>
      <select {...register(`catStrangers`)}>
        <option value={1}>Yes</option>
        <option value={0}>No</option>
      </select>
    </div>
    <Button variant="primary" type="submit">Submit</Button>
  </Form>;
};
