import { Observable } from 'rxjs'

export const observableToPromise = <T>(observable: Observable<T>): Promise<T[]> => {
  return new Promise<T[]>((resolve, reject) => {
    const items: T[] = []
    observable.subscribe({
      next: (item) => items.push(item),
      error: (err: unknown) => reject(err),
      complete: () => resolve(items),
    })
  })
}
