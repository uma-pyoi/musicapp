import { Injectable } from '@nestjs/common';
import { InjectEntityManager } from '@nestjs/typeorm';
import { registerDecorator, ValidationArguments, ValidationOptions, ValidatorConstraint, ValidatorConstraintInterface } from 'class-validator';
import { Track } from 'src/track/entities/track.entity';
import { DataSource, EntityManager } from 'typeorm';

interface IIsUniqueTrackNumber {
  column: string;
  albumId: string;
}

@ValidatorConstraint({ name: 'IsUniqueConstraint', async: true })
@Injectable()
export class IsUniqueTrackNumberConstraint implements ValidatorConstraintInterface {
  constructor(
    @InjectEntityManager() private readonly entityManager: EntityManager,
    private dataSource: DataSource,
  ) {}
  async validate(value: any, args?: ValidationArguments): Promise<boolean> {
    const { albumId, column }: IIsUniqueTrackNumber = args.constraints[0];
    const albumIdValue = args.object[albumId];

    const dataExist = await this.entityManager
      .getRepository(Track)
      .createQueryBuilder('track')
      .where({ [column]: value, albumId: albumIdValue })
      .getExists();

    return !dataExist;
  }

  defaultMessage(validationArguments?: ValidationArguments): string {
    const field: string = validationArguments.property;
    return `${field} is not unique in its album`;
  }
}

export function isUniqueTrackNumber(options: IIsUniqueTrackNumber, validationOptions?: ValidationOptions) {
  return function (object: any, propertyName: string) {
    registerDecorator({
      name: 'isUniqueTrackNumber',
      target: object.constructor,
      propertyName: propertyName,
      options: validationOptions,
      constraints: [options],
      validator: IsUniqueTrackNumberConstraint,
    });
  };
}
