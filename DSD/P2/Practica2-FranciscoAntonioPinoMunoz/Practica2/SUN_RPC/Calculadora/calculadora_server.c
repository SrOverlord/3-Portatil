
#include "calculadora.h"
#include <math.h>

double *
sumar_1_svc(double operador_1, double operador_2,  struct svc_req *rqstp)
{
	static double  result;

	result = operador_1 + operador_2;

	return &result;
}

double *
restar_1_svc(double operador_1, double operador_2,  struct svc_req *rqstp)
{
	static double  result;

	result = operador_1 - operador_2;

	return &result;
}

double *
multiplicar_1_svc(double operador_1, double operador_2,  struct svc_req *rqstp)
{
	static double  result;

	result = operador_1 * operador_2;

	return &result;

}

double *
dividir_1_svc(double operador_1, double operador_2,  struct svc_req *rqstp)
{
	static double  result;

	result = operador_1 / operador_2;

	return &result;
}
