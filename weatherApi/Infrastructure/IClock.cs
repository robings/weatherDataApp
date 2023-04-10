using System;
namespace weatherApi.Infrastructure
{
	public interface IClock
	{
		DateTime Now();
	}
}
