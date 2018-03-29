interface AliasFn<Subject> {
  (): Cypress.Chainable<Subject>
  alias: string
}

declare namespace Cypress {
  interface Chainable<Subject> {
    createAlias(): AliasFn<Subject>

    getAliases<T1, T2, T3, T4>(values: [AliasFn<T1>, AliasFn<T2>, AliasFn<T3>, AliasFn<T4>]): Chainable<[T1, T2, T3, T4]>
    getAliases<T1, T2, T3>(values: [AliasFn<T1>, AliasFn<T2>, AliasFn<T3>]): Chainable<[T1, T2, T3]>
    getAliases<T1, T2>(values: [AliasFn<T1>, AliasFn<T2>]): Chainable<[T1, T2]>
    getAliases<T>(values: (AliasFn<T>)[]): Chainable<T[]>
  }
}

// We use 'before' because Cypress throws an error if commands are used outside the context of a test
before(() => {
  // We need to access the $Chainer prototype directly. It is not exposed except
  // when a $Chainer is created by a Cypress command and then it is on __proto__
  // This seems very hacky, but the __proto__ is widely supported
  ;(cy.wrap('') as any).__proto__.createAlias = function<Subject>(): AliasFn<Subject> {
    // Create a unique identifier. We don't need to access it directly
    const id = Cypress._.uniqueId('alias_')

    // Save the current subject under a private alias. We have no other way of getting
    // the subject out of the chain
    this.as(id)

    // This function will return a cy.get that can access our private alias
    const aliasFn = (() => cy.get<Subject>(`@${id}`, { log: false })) as AliasFn<Subject>

    aliasFn.alias = id
    return aliasFn
  }
})

Cypress.Commands.add('getAliases', { prevSubject: false }, function(
  this: Mocha.ITestCallbackContext,
  aliases: AliasFn<any>[]
) {
  return cy.wrap('', { log: false }).then(() => {
    return aliases.map(alias => this[alias.alias])
  })
})
