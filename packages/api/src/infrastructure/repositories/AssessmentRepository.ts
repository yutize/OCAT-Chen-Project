import { IAssessmentRepository } from '../../application/contracts';
import { Assessment as AssessmentType, CreateAssessmentDTO } from '../../types';
import { Assessment } from '../sequelize/models';

export class AssessmentRepository implements IAssessmentRepository {
  public async create(assessmentData: CreateAssessmentDTO): Promise<AssessmentType> {
    // TODO: Implement Create
    const assessment = await Assessment.create({
      catDateOfBirth: assessmentData.catDateOfBirth,
      catName: assessmentData.catName,
      instrumentType: assessmentData.instrumentType,
      riskLevel: assessmentData.riskLevel,
      score: assessmentData.score,
    });
    return assessment.get({ plain: true }) as AssessmentType;
  }

  public async findAll(): Promise<AssessmentType[]> {
    // TODO: Implement Find All
    const returnAll = await Assessment.findAll();
    return returnAll;
  }

  public async delete(id: number): Promise<boolean> {
    console.log(`reached deletion stage`, id);
    return Promise.reject(new Error(`Not implemented`));
  }
}
