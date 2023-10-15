import {
  ValidatorConstraint,
  ValidatorConstraintInterface,
} from 'class-validator';

@ValidatorConstraint({ name: 'customText', async: false })
export class GenderValidation implements ValidatorConstraintInterface {
  validate(text: string) {
    return text === 'male' || text === 'female'; // for async validations you must return a Promise<boolean> here
  }

  defaultMessage() {
    // here you can provide default error message if validation failed
    return 'Text ($value) is too short or too long!';
  }
}
