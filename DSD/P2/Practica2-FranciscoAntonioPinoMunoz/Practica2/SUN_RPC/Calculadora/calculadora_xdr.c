/*
 * Please do not edit this file.
 * It was generated using rpcgen.
 */

#include "calculadora.h"

bool_t
xdr_sumar_1_argument (XDR *xdrs, sumar_1_argument *objp)
{
	 if (!xdr_double (xdrs, &objp->operador_1))
		 return FALSE;
	 if (!xdr_double (xdrs, &objp->operador_2))
		 return FALSE;
	return TRUE;
}

bool_t
xdr_restar_1_argument (XDR *xdrs, restar_1_argument *objp)
{
	 if (!xdr_double (xdrs, &objp->operador_1))
		 return FALSE;
	 if (!xdr_double (xdrs, &objp->operador_2))
		 return FALSE;
	return TRUE;
}

bool_t
xdr_multiplicar_1_argument (XDR *xdrs, multiplicar_1_argument *objp)
{
	 if (!xdr_double (xdrs, &objp->operador_1))
		 return FALSE;
	 if (!xdr_double (xdrs, &objp->operador_2))
		 return FALSE;
	return TRUE;
}

bool_t
xdr_dividir_1_argument (XDR *xdrs, dividir_1_argument *objp)
{
	 if (!xdr_double (xdrs, &objp->operador_1))
		 return FALSE;
	 if (!xdr_double (xdrs, &objp->operador_2))
		 return FALSE;
	return TRUE;
}
