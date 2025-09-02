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

    const filtered = Object.fromEntries(
      Object.entries(data).filter(([ key ]) => allowedKeys.includes(key)),
    );
    await AssessmentService.submit(filtered);
  };

  return <Form onSubmit={handleSubmit(onSubmit)} className="p-4">
    <h1>Cat Behavioral Instrument</h1>
    <h2>Cat Details</h2>

    <Form.Group className="mb-3" controlId="catName">
      <Form.Label>Cat Name</Form.Label>
      <Form.Control
        type="text"
        placeholder="Enter cat name"
        {...register(`catName`)}
      />
    </Form.Group>

    <Form.Group className="mb-3" controlId="catDateOfBirth">
      <Form.Label>Cat Date of Birth</Form.Label>
      <Form.Control type="date" {...register(`catDateOfBirth`)} />
    </Form.Group>

    <h2>Questions and Responses</h2>

    <Form.Group className="mb-3" controlId="catContact">
      <Form.Label>Previous contact with the Cat Judicial System</Form.Label>
      <Form.Select {...register(`catContact`)}>
        <option value={1}>Yes</option>
        <option value={0}>No</option>
      </Form.Select>
    </Form.Group>

    <Form.Group className="mb-3" controlId="catAltercation">
      <Form.Label>Physical Altercations with other cats</Form.Label>
      <Form.Select {...register(`catAltercation`)}>
        <option value={1}>3+</option>
        <option value={0}>0-3</option>
      </Form.Select>
    </Form.Group>

    <Form.Group className="mb-3" controlId="catOwner">
      <Form.Label>
        Physical altercations with owner (scratching, biting, etc.)
      </Form.Label>
      <Form.Select {...register(`catOwner`)}>
        <option value={1}>10+</option>
        <option value={0}>0-10</option>
      </Form.Select>
    </Form.Group>

    <Form.Group className="mb-3" controlId="catDogs">
      <Form.Label>Plays well with dogs</Form.Label>
      <Form.Select {...register(`catDogs`)}>
        <option value={0}>Yes</option>
        <option value={1}>No</option>
      </Form.Select>
    </Form.Group>

    <Form.Group className="mb-3" controlId="catStrangers">
      <Form.Label>Hisses at strangers</Form.Label>
      <Form.Select {...register(`catStrangers`)}>
        <option value={1}>Yes</option>
        <option value={0}>No</option>
      </Form.Select>
    </Form.Group>

    <Button variant="primary" type="submit">
      Submit
    </Button>
  </Form>;
};
