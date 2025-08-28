import { inject, injectable } from 'inversify';
import { IAssessmentRepository } from '../../../contracts';
import { Assessment, IUseCase } from '../../../../types';

@injectable()
export class GetAssessmentListUseCase implements IUseCase<void, Assessment[]> {
  public constructor(
    @inject(IAssessmentRepository) private assessmentRepository: IAssessmentRepository,
  ) {}

  public async execute(): Promise<Assessment[]> {
    // TODO: Implement the assessment list retrieval logic
    console.log(`doing something`);
    const retrieveData = await this.assessmentRepository.findAll();
    console.log(`retieved data from assrepo`, retrieveData);
    return retrieveData;
  }
}
