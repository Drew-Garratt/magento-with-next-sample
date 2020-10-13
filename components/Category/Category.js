import React from 'react'
import styles from './Category.module.css'
import { useQuery } from '@apollo/client'
import CATEGORY_QUERY from './Category.graphql'
import CategoryList from '~/components/CategoryList'
import Products from '~/components/Products'
import Link from 'next/link'
import Head from 'next/head'

export const Category = ({ filters }) => {
  const { loading, data, error } = useQuery(CATEGORY_QUERY, {
    variables: { filters },
  })

  if (error) {
    console.error(error)
    return <div>💩 There was an error.</div>
  }

  if (loading && !data) return <div>⌚️ Loading...</div>

  const category = data.categoryList[0]

  const backUrl =
    category.breadcrumbs && category.breadcrumbs[0]?.category_url_key

  return (
    <React.Fragment>
      <Head>
        <title>{category.name}</title>
      </Head>

      <div className={styles.category}>
        <header className={styles.header}>
          {backUrl && (
            <Link key={backUrl} href={backUrl}>
              <a className={styles.backLink}>⬅</a>
            </Link>
          )}

          <h2>{category.name}</h2>
        </header>

        {category.children?.length > 0 && (
          <CategoryList items={category.children} />
        )}

        <Products filters={{ category_id: { eq: category.id } }} />
      </div>
    </React.Fragment>
  )
}
