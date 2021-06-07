const HttpCode = {
    OK: 200,
    CREATED: 201,
    NO_CONTENT: 204,
    BAD_REQUEST: 400,
    UNAUTHORIZED:401,
    FORBIDDEN: 403,
    NOT_FOUND: 404,
    CONFLICT: 409,
    INTERNAL_SERVER_ERROR: 500,
}

const Subscription = {
    STARTER: "starter",
    PRO: "pro",
    BUSINESS: "business",
}

const Response = {
    ok: { status: 'success', code: HttpCode.OK },
    created: { status: 'success', code: HttpCode.CREATED },
    notFound: { status: 'error', code: HttpCode.NOT_FOUND, message: 'Not found' }, 
    badRequest: { status: 'error', code: HttpCode.BAD_REQUEST },
    conflict: { status: 'error', code: HttpCode.CONFLICT },
    unauthorized: { status: 'error', code: HttpCode.UNAUTHORIZED },
}

module.exports = { HttpCode, Subscription, Response }