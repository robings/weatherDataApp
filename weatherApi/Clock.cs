using System;
namespace weatherApi
{
	public class Clock
	{
		private Func<DateTime> _nowProvider;

		public Clock(Func<DateTime> nowProvider)
		{
			_nowProvider = nowProvider;
		}

		public DateTime Now() => _nowProvider();
	}
}

