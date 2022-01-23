import { Either, left, right } from '../../../../either';
import { InvalidRepresentativeCpfError } from '../errors/invalid-representative-cpf-error';

export class RepresentativeCpf {
  private readonly representativeCpf: number;

  private constructor(representativeCpf: number) {
    this.representativeCpf = representativeCpf;
  }

  static create(
    representativeCpf: number
  ): Either<InvalidRepresentativeCpfError, RepresentativeCpf> {
    if (!RepresentativeCpf.validate(representativeCpf)) {
      return left(new InvalidRepresentativeCpfError());
    }
    return right(new RepresentativeCpf(representativeCpf));
  }

  get value(): number {
    return this.representativeCpf;
  }

  static validate(representativeCpf: number): boolean {
    if (!representativeCpf) {
      return false;
    }
    return true;
  }
}
