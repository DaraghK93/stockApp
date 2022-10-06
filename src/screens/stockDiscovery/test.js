(
    <>
      {loading ? <LoadingSpinner/> : error ? <MessageAlert variant="danger">{error}</MessageAlert>:
      <Container>
            <Row>
                <Col>
                <h1>{movie.original_title}</h1>
                </Col>
            </Row> 
            <Row>
              <Col>
                <p>{movie.description}</p>
              </Col> 
            </Row>
            {userInfo && 
            <Row className="pb-3"> 
              <Col>
                <AddDeleteMyMovie movieId={id}/>
              </Col>
            </Row>
            }
            <Row>
            <Col>
                <h2>Details</h2>
                <MovieDetails movie={movie} />
            </Col>
            </Row>
            <h2>Reviews</h2>
            {userInfo ? (
              <Row>
                <Col className='pb-4'>
                  <AddReview movieId={id}/>
                </Col>
              </Row>
            )
            :      
              <Row>
                <Col className='text-center pb-2'>
                  <h5>
                  Want to review {movie.original_title}?  
                  <Link className='px-1' to='/login'>Sign In</Link>
                  or<Link className='px-1' to='/register'>Register</Link>
                  today!
                  </h5>
                </Col>
              </Row>
            }
            <Row>
              <Col>
              {movie.reviews.length > 0 ?
              (movie.reviews.map((review) =>(<Review movieId={movie._id} review={review}> </Review>)))
              :
              <Card className="mb-3">
                <Card.Body>
                    <Card.Title>No Reviews Yet</Card.Title>
                    <Card.Text>
                        No reviews have been posted for this film yet!
                    </Card.Text>
                </Card.Body>
            </Card>
              }
              </Col>
            </Row>
      </Container>
      }
      </> 
);