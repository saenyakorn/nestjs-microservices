import { Observable } from 'rxjs'

export const observableToPromises = <T>(observable: Observable<T>): Promise<T[]> => {
  return new Promise<T[]>((resolve, reject) => {
    const items: T[] = []
    observable
      .forEach((next) => items.push(next))
      .then(() => resolve(items))
      .catch(reject)
  })
}
