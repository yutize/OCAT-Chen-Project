import { inject, injectable } from 'inversify';
import { IUseCase } from 'src/types/shared';
import { Assessment, CreateAssessmentDTO } from 'src/types';
import { IAssessmentRepository } from '../../../contracts';

@injectable()
export class CreateAssessmentUseCase implements IUseCase<CreateAssessmentDTO, Assessment> {
  public constructor(
    @inject(IAssessmentRepository) private assessmentRepository: IAssessmentRepository,
  ) {}

  public async execute(assessmentData: CreateAssessmentDTO): Promise<Assessment> {
    // TODO: Implement business validation logic here
    console.log(`useCase Data`, assessmentData);
    if (assessmentData.score < 0 || assessmentData.score > 5) {
      throw new Error(`Score must be valid`);
    }
    // HINT: Validate that the score is between 0 and 5
    // HINT: Validate that the risk level matches the score calculation

    const createdAssessment = this.assessmentRepository.create(assessmentData);
    return createdAssessment;
  }

  public async getData() {
    console.log(`doing something`);
    const retrieveData = await this.assessmentRepository.findAll();
    console.log(`retieved data from assrepo`, retrieveData);
    return retrieveData;
  }
}
